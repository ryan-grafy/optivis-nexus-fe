"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ATSHeader } from "./ATSHeader";
import { TSIHeader } from "./TSIHeader";
import { MainContainer } from "./MainContainer";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

interface AppLayoutProps {
  children: React.ReactNode;
  headerType?: "default" | "ats" | "tsi";
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  headerType = "default",
}) => {
  return (
    /*
     * Figma 전체 프레임: 2560×1314px
     * bg: rgb(231,229,231) = #E7E5E7
     * Sidebar: 96px 고정 (position fixed)
     * 나머지: sidebar 이후 영역
     */
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#E7E5E7",
      }}
    >
      <Sidebar />
      {/* 사이드바 96px 제외한 영역 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "calc(100% - 96px)",
          marginLeft: "96px",
          overflow: "hidden",
        }}
      >
        {headerType === "ats" ? (
          <ATSHeader />
        ) : headerType === "tsi" ? (
          <TSIHeader />
        ) : (
          <Header />
        )}
        {/* 컨텐츠 영역: 헤더 아래 나머지 100% 채움 */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            minWidth: 0,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MainContainer>{children}</MainContainer>
        </div>
      </div>
    </div>
  );
};
