"use client";

interface PackageVideoPanelProps {
  title: string;
  description: string;
  videoUrl: string;
}

export default function PackageVideoPanel({
  title,
  description,
  videoUrl,
}: PackageVideoPanelProps) {
  return (
    <div
      className="relative flex flex-col w-full h-full overflow-hidden"
      style={{
        borderRadius: "32px", // Matching internal radius of HeroPanel's image/right section approx or just rounding it nicely
        backgroundColor: "#000",
      }}
    >
      {/* Video Background */}
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />

      {/* Text Overlay */}
      {/* 
        Positioning: Top-Left
        Style: Matching FeatureCard/HeroPanel text styles but adapted for overlay visibility.
        Using a gradient overlay for text readability if needed, or just placing it. 
        User request: "Text selected content... Twin Predict, Simulate..."
        I'll add a subtle gradient to ensure text pops against the video.
      */}
      <div
        className="relative z-10 flex flex-col items-start justify-start p-8"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          width: "100%",
          padding: "40px", // Giving some space
          gap: "16px",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 600,
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            margin: 0,
            maxWidth: "80%",
            textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(16px, 1.5vw, 20px)",
            fontWeight: 400,
            lineHeight: "1.5",
            color: "rgba(255, 255, 255, 0.9)",
            margin: 0,
            maxWidth: "600px",
            textShadow: "0px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
