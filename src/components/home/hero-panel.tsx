"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeroPanelProps {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  serviceId?: string | null;
}

/**
 * Figma 스펙 기반 HeroPanel
 *
 * Frame 1618873789: 1396×400px, HORIZONTAL, gap=288px
 * Left (Frame 1618872474): 492×363px, VERTICAL, gap=72px
 *   - 제목 텍스트: Poppins 600 50px #111111, letterSpacing -3px
 *   - 설명: Inter 400 20px #484646
 *   - 버튼 (Solid Buttons): 218×48px, bg #FF6B00, r=32, padding 28px 24px
 *     텍스트 Inter 600 19.5px white
 * Right (image 8579): 675×400px r=24
 */
export default function HeroPanel({
  title,
  description,
  imageUrl,
  videoUrl,
  serviceId,
}: HeroPanelProps) {
  const router = useRouter();

  const isDisabled = serviceId === "6";

  const getSimulationPath = () => {
    if (serviceId === "4") return "/ats/simulation";
    if (serviceId === "5") return "/tsi";
    return "/simulation";
  };

  const handleNewSimulation = () => {
    if (!isDisabled) {
      router.push(getSimulationPath());
    }
  };

  return (
    <div
      className="flex w-full"
      style={{ 
        gap: "clamp(20px, 4%, 288px)", 
        alignItems: "flex-start",
        flexWrap: "wrap"
      }}
    >
      {/* Left - 텍스트 영역 (Figma 492px → 42% 비율) */}
      <div
        className="flex flex-col"
        style={{ gap: "clamp(20px, 6%, 72px)", flex: "1 1 350px", minWidth: 0 }}
      >
        {/* Text group: VERTICAL gap=21.99px */}
        <div className="flex flex-col" style={{ gap: "21.99px" }}>
          {/* 제목: Poppins 600 50px #111111 */}
          <h2
            style={{
              fontFamily: "Poppins",
              fontSize: "clamp(28px, 3.5vw, 50px)",
              fontWeight: 600,
              lineHeight: "1.1",
              letterSpacing: "-0.06em",
              color: "#111111",
              margin: 0,
            }}
          >
            {title}
          </h2>
          {/* 설명: Inter 400 20px #484646 */}
          <p
            style={{
              fontFamily: "Inter",
              fontSize: "clamp(15px, 1.4vw, 20px)",
              fontWeight: 400,
              lineHeight: "1.4",
              letterSpacing: "-0.02em",
              color: "#484646",
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* New Simulation 버튼: Figma 218×48px, bg #FF6B00 r=32, padding 28px 24px */}
        <button
          onClick={handleNewSimulation}
          disabled={isDisabled}
          className="flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-80"
          style={{
            width: "218px",
            height: "48px",
            backgroundColor: isDisabled ? "#CCCCCC" : "#FF6B00",
            borderRadius: "32px",
            paddingLeft: "28px",
            paddingRight: "24px",
            paddingTop: "6px",
            paddingBottom: "6px",
            gap: "8px",
            border: "none",
            cursor: isDisabled ? "not-allowed" : "pointer",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "Inter",
              fontSize: "19.5px",
              fontWeight: 600,
              lineHeight: "100%",
              letterSpacing: "-0.585px",
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            New Simulation
          </span>
          {/* 화살표 아이콘 (Figma: Frame 1618872882 20.57×20.57px) */}
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M4.5 10.5H16.5M16.5 10.5L11.5 5.5M16.5 10.5L11.5 15.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Right - 이미지 또는 비디오: Figma 675×400px r=24 (58% 비율) */}
      <div
        className="overflow-hidden bg-black"
        style={{
          flex: "1 1 400px",
          maxWidth: "675px",
          aspectRatio: "675 / 400",
          borderRadius: "24px",
        }}
      >
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            width={675}
            height={400}
            className="w-full h-full object-cover"
            style={{ width: "100%", height: "100%" }}
            priority
          />
        )}
      </div>
    </div>
  );
}
