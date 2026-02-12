"use client";

import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  selectedIcon?: string;
  variant?: "glass" | "solid" | "purple";
  isSelected?: boolean;
  onClick?: () => void;
  sectionType?: "package" | "service";
}

/**
 * Figma 스펙 기반 FeatureCard
 *
 * Package 카드:
 *   - 기본: bg white r=24, 아이콘 bg #5C5891 r=32, 타이틀 #000 설명 #484646
 *   - 선택: bg #262255 r=24, 아이콘 bg white r=32, 타이틀 white 설명 white
 *   카드 크기: 414×352px, padding 24px, gap 60px (icon-text)
 *
 * Service 카드:
 *   - 기본: bg white r=24, 아이콘 bg #5C5891 r=32
 *   - Drug Response (purple variant): bg #C5C6EF r=24
 *   - 선택: 테두리만 강조 (bg 변경 없음)
 *   카드 크기: 413×352px, padding 24px, gap 30px (icon-text)
 */
export default function FeatureCard({
  title,
  description,
  icon,
  selectedIcon,
  variant = "glass",
  isSelected = false,
  onClick,
  sectionType = "package",
}: FeatureCardProps) {
  const isPackage = sectionType === "package";

  // 카드 배경색
  let cardBg: string;
  let cardBorder: string;
  let cardShadow: string;

  if (isPackage) {
    if (isSelected) {
      // Figma: Fill #262255, Glass Effect black r=24
      cardBg = "linear-gradient(180deg, rgba(56,51,110,1) 0%, rgba(38,34,85,1) 100%)";
      cardBorder = "1px solid rgba(255,255,255,0.15)";
      cardShadow = "0 4px 24px rgba(38,34,85,0.4), inset 0 1px 0 rgba(255,255,255,0.1)";
    } else {
      // Figma: Fill white, Glass Effect black r=24
      cardBg = "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,248,248,0.90) 100%)";
      cardBorder = "1px solid rgba(255,255,255,0.8)";
      cardShadow = "0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)";
    }
  } else {
    if (variant === "purple") {
      // Figma: Drug Response - Fill #C5C6EF, Glass Effect #C5C6EF r=24
      cardBg = isSelected
        ? "linear-gradient(180deg, #C5C6EF 0%, #B8B9E8 100%)"
        : "linear-gradient(180deg, rgba(197,198,239,0.9) 0%, rgba(197,198,239,0.85) 100%)";
      cardBorder = isSelected ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(197,198,239,0.6)";
      cardShadow = "0 2px 12px rgba(0,0,0,0.08)";
    } else {
      // Figma: Fill white, Glass Effect black r=24
      cardBg = isSelected
        ? "linear-gradient(180deg, rgba(232,230,255,0.8) 0%, rgba(220,218,255,0.75) 100%)"
        : "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,248,248,0.90) 100%)";
      cardBorder = isSelected
        ? "1px solid rgba(100,88,220,0.4)"
        : "1px solid rgba(255,255,255,0.8)";
      cardShadow = isSelected
        ? "0 2px 12px rgba(100,88,220,0.12), inset 0 1px 0 rgba(255,255,255,0.9)"
        : "0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)";
    }
  }

  // 아이콘 배경색
  let iconBg: string;
  if (isPackage) {
    iconBg = isSelected ? "#FFFFFF" : "#5C5891";
  } else {
    iconBg = variant === "purple" ? "#222222" : "#5C5891";
  }

  // 텍스트 색상
  const titleColor = isPackage && isSelected ? "#FFFFFF" : "#000000";
  const descColor = isPackage && isSelected ? "rgba(255,255,255,0.85)" : "#484646";

  // 아이콘 소스
  const iconSrc = isSelected && selectedIcon ? selectedIcon : icon;

  // 카드 padding / gap - Figma 기준
  const cardPad = 24; // 모든 방향 24px
  const iconTextGap = isPackage ? 60 : 30; // Package: 60px gap, Service: 30px

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer flex flex-col"
      style={{
        width: "100%",
        /* 높이는 내용에 따라 flex로 채움 (Figma 352px 기준이나 반응형 허용) */
        flex: 1,
        minHeight: "260px",
        padding: `${cardPad}px`,
        gap: `${iconTextGap}px`,
        borderRadius: "24px",
        background: cardBg,
        border: cardBorder,
        boxShadow: cardShadow,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "all 0.2s ease",
      }}
    >
      {/* 아이콘: Figma 54×54px r=32 */}
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: 54,
          height: 54,
          borderRadius: 32,
          backgroundColor: iconBg,
          transition: "background-color 0.2s ease",
        }}
      >
        <Image
          src={iconSrc}
          alt={title}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>

      {/* 텍스트 영역: gap 8px */}
      <div className="flex flex-col" style={{ gap: "8px" }}>
        {/* 타이틀: Inter 600 19.5px */}
        <p
          style={{
            fontFamily: "Inter",
            fontSize: "19.5px",
            fontWeight: 600,
            lineHeight: "100%",
            letterSpacing: "-0.585px",
            color: titleColor,
            margin: 0,
            transition: "color 0.2s ease",
          }}
        >
          {title}
        </p>

        {/* 설명: Inter 400 15px */}
        <p
          style={{
            fontFamily: "Inter",
            fontSize: "15px",
            fontWeight: isPackage && isSelected ? 500 : 400,
            lineHeight: "22px",
            letterSpacing: "-0.3px",
            color: descColor,
            margin: 0,
            transition: "color 0.2s ease",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
