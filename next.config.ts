import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 개발 환경에서 Cross origin 요청 허용
  allowedDevOrigins: ["192.168.0.61"],

  // 이미지 최적화 설정
  images: {
    unoptimized: true, // 정적 export 시 필요
  },

  // SVGR 설정 - SVG를 React 컴포넌트로 import 가능
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  // 빌드 시 ESLint 건너뛰기 (빠른 배포용)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript 타입 체크 건너뛰기 (빠른 배포용)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
