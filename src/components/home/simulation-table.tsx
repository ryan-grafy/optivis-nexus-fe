"use client";

interface SimulationTableProps {
  serviceId?: string | null;
}

/**
 * Figma 스펙 기반 SimulationTable
 *
 * Frame 1618872480 (전체): 1396×659px VERTICAL gap=12px
 *
 * Header (Frame 1618872480 내부):
 *   1396×41px, bg #000000 r=24
 *   padding 좌우 24px, 상하 12px
 *   컬럼들: Inter 600 15px white
 *   컬럼 gap: 32.98px
 *   컬럼 너비: Simulation name 145.66px / Disease 164.9px / Outcome 140.16px / Description 283.08px / Last updated 160.78px
 *
 * Body (Frame 1618872478):
 *   1396×606px, bg white r=24
 *   빈 상태: "No saved simulations." Inter 600 19.5px #C6C5C9 가운데
 */
export default function SimulationTable({ serviceId }: SimulationTableProps) {
  const isATSorTSI = serviceId === "4" || serviceId === "5";

  const columns = isATSorTSI
    ? [
        { label: "Simulation name", width: "145.66px" },
        { label: "Disease",         width: "164.9px" },
        { label: "Outcome",         width: "140.16px" },
        { label: "Description",     width: "283.08px" },
        { label: "Last updated",    width: "160.78px" },
      ]
    : [
        { label: "Patient ID",   width: "145.66px" },
        { label: "Disease",      width: "164.9px" },
        { label: "Outcome",      width: "140.16px" },
        { label: "Description",  width: "283.08px" },
        { label: "Last updated", width: "160.78px" },
      ];

  return (
    <div
      className="flex flex-col w-full"
      style={{ gap: "12px" }}
    >
      {/* Table Header: Figma 1396×41px bg #000 r=24, padding 24px 좌우 12px 상하 */}
      <div
        className="flex items-center"
        style={{
          width: "100%",
          height: "41px",
          backgroundColor: "#000000",
          borderRadius: "24px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "12px",
          paddingBottom: "12px",
          flexShrink: 0,
        }}
      >
        {/* 컬럼들: Frame 1618872462 - gap 32.98px */}
        <div
          className="flex items-center"
          style={{ gap: "32.98px", width: "100%" }}
        >
          {columns.map((col) => (
            <span
              key={col.label}
              style={{
                fontFamily: "Inter",
                fontSize: "15px",
                fontWeight: 600,
                lineHeight: "17px",
                letterSpacing: "-0.3px",
                color: "#FFFFFF",
                width: col.width,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {col.label}
            </span>
          ))}
        </div>
      </div>

      {/* Table Body: Figma 1396×606px bg white r=24 */}
      <div
        className="flex items-center justify-center w-full"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          minHeight: "394px",
          flex: 1,
        }}
      >
        {/* 빈 상태: Figma Inter 600 19.5px #C6C5C9 */}
        <span
          style={{
            fontFamily: "Inter",
            fontSize: "19.5px",
            fontWeight: 600,
            lineHeight: "100%",
            letterSpacing: "-0.585px",
            color: "#C6C5C9",
          }}
        >
          No saved simulations.
        </span>
      </div>
    </div>
  );
}
