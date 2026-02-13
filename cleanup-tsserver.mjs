#!/usr/bin/env node

import { execSync } from "node:child_process";
import fs from "node:fs";
import process from "node:process";

const cliArgs = new Set(process.argv.slice(2));
const isApply = cliArgs.has("--apply");
const includeAntigravity = cliArgs.has("--include-antigravity");
const showHelp = cliArgs.has("--help") || cliArgs.has("-h");

if (showHelp) {
  process.stdout.write(
    [
      "Usage:",
      "  node cleanup-tsserver.mjs            # dry-run (default)",
      "  node cleanup-tsserver.mjs --apply    # kill duplicate targets",
      "",
      "Options:",
      "  --include-antigravity  include Antigravity tsserver in cleanup targets",
      "  -h, --help             show help",
      "",
      "Notes:",
      "  - Dry-run only prints what would be terminated.",
      "  - By default, Antigravity-owned tsserver processes are protected.",
    ].join("\n") + "\n",
  );
  process.exit(0);
}

function readProcessRows() {
  const output = execSync("ps -eo pid=,ppid=,args=", { encoding: "utf8" });
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(\d+)\s+(\d+)\s+(.+)$/);
      if (!match) return null;
      const pid = Number(match[1]);
      const ppid = Number(match[2]);
      const args = match[3];
      return { pid, ppid, args };
    })
    .filter(Boolean);
}

function extractCancellationKey(args) {
  const match = args.match(/--cancellationPipeName\s+(\S+)/);
  if (!match) return "none";
  return match[1].replace(/\/tscancellation[^/\s]*/g, "/tscancellation*");
}

function getMode(args) {
  if (args.includes("--serverMode partialSemantic")) return "partial";
  if (args.includes("--serverMode syntax")) return "syntax";
  return "semantic";
}

function getOwner(args) {
  if (args.includes(".antigravity-server")) return "antigravity";
  if (args.includes("/node_modules/typescript/lib/tsserver.js")) return "workspace";
  return "other";
}

function isTargetTsServer(args) {
  return args.includes("typescript/lib/tsserver.js") && !args.includes("typescript-language-server/lib/cli.mjs");
}

function canSafelyKill(pid) {
  const cmdlinePath = `/proc/${pid}/cmdline`;
  if (!fs.existsSync(cmdlinePath)) return false;
  const cmdline = fs.readFileSync(cmdlinePath, "utf8").replace(/\u0000/g, " ");
  return cmdline.includes("typescript/lib/tsserver.js") && !cmdline.includes("typescript-language-server/lib/cli.mjs");
}

const rows = readProcessRows()
  .filter((row) => isTargetTsServer(row.args))
  .map((row) => ({
    ...row,
    mode: getMode(row.args),
    owner: getOwner(row.args),
    cancellationKey: extractCancellationKey(row.args),
  }));

const candidates = rows.filter((row) => includeAntigravity || row.owner !== "antigravity");

const grouped = new Map();
for (const row of candidates) {
  const key = `${row.owner}|${row.ppid}|${row.mode}|${row.cancellationKey}`;
  const list = grouped.get(key) ?? [];
  list.push(row);
  grouped.set(key, list);
}

const duplicatesToKill = [];
for (const [, list] of grouped) {
  if (list.length <= 1) continue;
  const sorted = [...list].sort((a, b) => b.pid - a.pid);
  const stale = sorted.slice(1);
  duplicatesToKill.push(...stale);
}

const header = isApply ? "[apply]" : "[dry-run]";
process.stdout.write(`${header} total-tsserver=${rows.length}, scan-targets=${candidates.length}, duplicates=${duplicatesToKill.length}\n`);

if (duplicatesToKill.length === 0) {
  process.stdout.write("No duplicate tsserver targets found.\n");
  process.exit(0);
}

for (const row of duplicatesToKill) {
  process.stdout.write(
    `- pid=${row.pid} ppid=${row.ppid} owner=${row.owner} mode=${row.mode} cancellation=${row.cancellationKey}\n`,
  );
}

if (!isApply) {
  process.stdout.write("Dry-run complete. Re-run with --apply to terminate the listed PIDs.\n");
  process.exit(0);
}

let killed = 0;
for (const row of duplicatesToKill) {
  if (!canSafelyKill(row.pid)) {
    process.stdout.write(`! skip pid=${row.pid} (safety check failed)\n`);
    continue;
  }
  try {
    process.kill(row.pid, "SIGTERM");
    killed += 1;
    process.stdout.write(`x terminated pid=${row.pid}\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stdout.write(`! failed pid=${row.pid}: ${message}\n`);
  }
}

process.stdout.write(`Done. terminated=${killed}, requested=${duplicatesToKill.length}\n`);
