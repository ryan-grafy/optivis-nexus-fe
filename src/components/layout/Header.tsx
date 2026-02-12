"use client";

import React from "react";
import Image from "next/image";

/**
 * Liquid Glass 버튼 — CSS only (border-image 제거, 순수 CSS로 유리 효과 구현)
 * Figma: 154px(Data template) / 140px(Data setting) × 42px, r=32
 * 텍스트: Inter 400 14.875px #0D063C
 */
function LiquidGlassBtn({
  children,
  iconSrc,
  onClick,
  width,
  variant,
}: {
  children: React.ReactNode;
  iconSrc?: string;
  onClick?: () => void;
  width: number;
  variant: "template" | "setting";
}) {
  const className =
    variant === "template"
      ? "figma-nine-slice figma-header-btn-template"
      : "figma-nine-slice figma-header-btn-setting";

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        width: `${width}px`,
        height: "42px",
        paddingLeft: "46px",
        paddingRight: "46px",
        borderRadius: "32px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        flexShrink: 0,
        transition: "opacity 0.15s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      onMouseDown={e => (e.currentTarget.style.opacity = "0.70")}
      onMouseUp={e => (e.currentTarget.style.opacity = "1")}
    >
      {iconSrc && (
        <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src={iconSrc}
            alt=""
            width={40}
            height={40}
            style={{
              width: variant === "template" ? "19.25px" : "15.75px",
              height: variant === "template" ? "19.25px" : "15.75px",
              objectFit: "contain",
            }}
          />
        </span>
      )}
      <span
        style={{
          fontFamily: "Inter",
          fontSize: "14.875px",
          fontWeight: 400,
          lineHeight: "15.619px",
          letterSpacing: "-0.446px",
          color: "#0D063C",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </button>
  );
}

/** 물음표 버튼: Figma 42×42px, Liquid Glass (frame에 ? 포함) */
function HelpBtn() {
  return (
    <button
      type="button"
      className="figma-nine-slice figma-header-btn-help"
      aria-label="Help"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "42px",
        height: "42px",
        borderRadius: "16px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        flexShrink: 0,
        transition: "opacity 0.15s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      onMouseDown={e => (e.currentTarget.style.opacity = "0.70")}
      onMouseUp={e => (e.currentTarget.style.opacity = "1")}
    />
  );
}

export const Header = () => {
  return (
    /*
     * Figma: Header 90px, bg #E7E5E7
     * padding: 좌우 14px, 상하 24px
     * 로고: Poppins 600 32px
     * 버튼 그룹: gap 10.5px
     */
    /*
     * Figma: Header fills=[] (투명 → 메인 프레임 bg #E7E5E7 그대로 보임)
     * height: 90px, padding 좌우 14px
     * position: sticky top-0 z-90
     */
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 90,
        width: "100%",
        height: "90px",
        /* Figma에서 header fills 없음 → 메인 bg 색과 동일하게 */
        backgroundColor: "#E7E5E7",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "14px",
        paddingRight: "14px",
        flexShrink: 0,
      }}
    >
      {/* 로고: Poppins SemiBold 32px */}
      <h1
        style={{
          fontFamily: "Poppins",
          fontSize: "32px",
          fontWeight: 600,
          lineHeight: "32px",
          letterSpacing: "-0.96px",
          color: "#000000",
          margin: 0,
          flexShrink: 0,
        }}
      >
        OPTIVIS Nexus
      </h1>

      {/* 오른쪽: 버튼 3개, gap 10.5px */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10.5px",
          flexShrink: 0,
        }}
      >
        {/* Data template: 154×42px */}
        <LiquidGlassBtn
          width={154}
          variant="template"
          iconSrc="/assets/figma/home/header-download-icon.png"
        >
          Data template
        </LiquidGlassBtn>

        {/* Data setting: 140×42px */}
        <LiquidGlassBtn
          width={140}
          variant="setting"
          iconSrc="/assets/figma/home/header-setting-icon.png"
        >
          Data setting
        </LiquidGlassBtn>

        {/* ? 버튼: 42×42px */}
        <HelpBtn />
      </div>
    </header>
  );
};
