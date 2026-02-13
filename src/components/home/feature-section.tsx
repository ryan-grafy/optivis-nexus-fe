"use client";

import FeatureCard from "./feature-card";
import { cn } from "@/lib/cn";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  selectedIcon?: string;
  variant?: "glass" | "solid" | "purple";
}

interface FeatureSectionProps {
  title: string;
  features: Feature[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

export default function FeatureSection({
  title,
  features,
  selectedId: externalSelectedId,
  onSelect: externalOnSelect,
}: FeatureSectionProps) {
  const handleCardClick = (id: string) => {
    if (externalOnSelect) {
      externalOnSelect(id);
    }
  };

  const selectedId = externalSelectedId;
  const sectionType = title.includes("Package") ? "package" : "service";
  const panelClass = sectionType === "package" ? "figma-home-panel-left" : "figma-home-panel-middle";

  // Figma: 섹션 번호/이름 파싱 ("01 Package" -> "01", "Package")
  const parts = title.split(" ");
  const sectionNum = parts[0];   // "01" or "02"
  const sectionName = parts.slice(1).join(" "); // "Package" or "Service"

  return (
    /*
     * Figma: Frame 1618872466 / Frame 1618872472
     * 470px(package) / 469px(service) × 1200px
     * padding: 28px, gap: 16px
     * bg: Liquid Glass (Fill #F5F5F5 r=36 + Glass Effect white r=36)
     */
    <div
      className={cn("relative flex flex-col figma-nine-slice", panelClass)}
      style={{
        width: "100%",
        flex: 1,
        minHeight: 0,
        padding: "28px",
        gap: "16px",
        borderRadius: "36px",
        overflow: "hidden",
      }}
    >
      {/* Header: "01 Package" / "02 Service" */}
      {/* Figma: Group - 숫자(Inter 500 17px #5F5E5E) + gap + 이름(Inter 500 17px #5F5E5E) */}
      <div
        className="flex flex-col"
        style={{ gap: "12px", flexShrink: 0 }}
      >
        <div className="flex items-center" style={{ gap: "20.6px" }}>
          <span
            style={{
              fontFamily: "Inter",
              fontSize: "17px",
              fontWeight: 500,
              lineHeight: "19px",
              color: "#5F5E5E",
            }}
          >
            {sectionNum}
          </span>
          <span
            style={{
              fontFamily: "Inter",
              fontSize: "17px",
              fontWeight: 500,
              lineHeight: "19px",
              color: "#5F5E5E",
            }}
          >
            {sectionName}
          </span>
        </div>
        {/* Figma: Line 806/807 - 414px, color #929090 */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#929090",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Feature Cards: gap=16px */}
      <div
        className="flex flex-col"
        style={{ gap: "16px", flex: 1, overflowY: "auto", minHeight: 0 }}
      >
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            selectedIcon={feature.selectedIcon}
            variant={feature.variant || "glass"}
            isSelected={selectedId === feature.id}
            onClick={() => handleCardClick(feature.id)}
            sectionType={sectionType}
          />
        ))}
      </div>
    </div>
  );
}
