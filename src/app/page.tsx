"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import FeatureSection from "@/components/home/feature-section";
import HeroPanel from "@/components/home/hero-panel";
import SimulationSearch from "@/components/home/simulation-search";
import SimulationTable from "@/components/home/simulation-table";
import { useHomeStore } from "@/store/homeStore";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  selectedIcon?: string;
  variant?: "glass" | "solid" | "purple";
}

interface Package {
  id: string;
  title: string;
  description: string;
  icon: string;
  selectedIcon?: string;
  services: Service[];
}

interface RightPanelContent {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string; // 영상 URL 필드 추가
}

const packages: Package[] = [
  {
    id: "1",
    title: "Twin Predict",
    description:
      "Simulates individual patient outcomes under various treatment conditions. Offers tailored response probabilities and treatment recommendations for clinical decision-making.",
    icon: "/assets/icons/twin-predict.svg",
    selectedIcon: "/assets/icons/twin-predict-selected.svg",
    services: [],
  },
  {
    id: "2",
    title: "Trial Optimizer",
    description:
      "Generates optimal clinical trial design strategies through repeated simulations across diverse trial design conditions.",
    icon: "/assets/icons/trial-optimizer.svg",
    selectedIcon: "/assets/icons/trial-optimizer-selected.svg",
    services: [
      {
        id: "4",
        title: "Adaptive Trial Simulation",
        description:
          "Generates optimal clinical trial design strategies through repeated simulations across diverse trial design conditions.",
        icon: "/assets/icons/adaptive-trial.svg",
        selectedIcon: "/assets/icons/adaptive-trial-selected.svg",
        variant: "glass" as const,
      },
      {
        id: "5",
        title: "Target Subgroup Identification",
        description:
          "Simulates individual patient outcomes under various treatment conditions. Offers tailored response probabilities and treatment recommendations for clinical decision-making.",
        icon: "/assets/icons/target-subgroup.svg",
        variant: "glass" as const,
      },
      {
        id: "6",
        title: "Drug Response Prediction Dashboard",
        description:
          "Supports early trial design by identifying target subgroups and simulating different scenarios. Helps sponsors reduce sample size, optimize power, and refine study strategies.",
        icon: "/assets/icons/drug-response.svg",
        selectedIcon: "/assets/icons/drug-response-selected.svg",
        variant: "glass" as const,
      },
    ],
  },
  {
    id: "3",
    title: "Virtual Control",
    description:
      "Supports early trial design by identifying target subgroups and simulating different scenarios. Helps sponsors reduce sample size, optimize power, and refine study strategies.",
    icon: "/assets/icons/virtual-control.svg",
    selectedIcon: "/assets/icons/virtual-control-selected.svg",
    services: [],
  },
];

const serviceContentMap: Record<string, RightPanelContent> = {
  "4": {
    title: "Adaptive Trial\nSimulation",
    description:
      "Generates optimal clinical trial design strategies through repeated simulations across diverse trial design conditions.",
    imageUrl: "/assets/main/adaptive-trial.png",
    videoUrl: "https://pub-797907feee5143c4a0f4f34c25916ee8.r2.dev/oprimed_movie/KakaoTalk_20260212_213739053.mp4",
  },
  "5": {
    title: "Target Subgroup\nIdentification",
    description:
      "Simulates individual patient outcomes under various treatment conditions. Offers tailored response probabilities and treatment recommendations for clinical decision-making.",
    imageUrl: "/assets/main/target-subgroup-identification.png",
  },
  "6": {
    title: "Conditional Drug\nResponse Prediction",
    description:
      "Drug level simulation based on patient baseline information and Simulation Settings, with support for multiple conditions per scenario",
    imageUrl: "/assets/main/conditional-drug.png",
  },
};

export default function HomePage() {
  const {
    selectedPackageId,
    selectedServiceId,
    setSelectedPackageId,
    setSelectedServiceId,
  } = useHomeStore();

  const selectedPackage = packages.find((p) => p.id === selectedPackageId);
  const availableServices = selectedPackage?.services || [];

  const rightPanelContent =
    selectedServiceId && serviceContentMap[selectedServiceId]
      ? serviceContentMap[selectedServiceId]
      : null;

  const handlePackageSelect = (packageId: string) => {
    const newPackageId = packageId === selectedPackageId ? null : packageId;
    setSelectedPackageId(newPackageId);
    setSelectedServiceId(null);
  };

  const handleServiceSelect = (serviceId: string) => {
    const newServiceId = serviceId === selectedServiceId ? null : serviceId;
    setSelectedServiceId(newServiceId);
  };

  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          gap: "1.986px",
          width: "100%",
          flex: 1,          /* 부모(main) flex-1로 100% 높이 */
          alignItems: "stretch",
          minHeight: 0,
        }}
      >
        {/* ── 왼쪽: Package (Figma 470/2391 = 19.66%) ── */}
        <div style={{
          flex: "470 1 0",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          minWidth: "250px",
        }}>
          <FeatureSection
            title="01 Package"
            features={packages.map((pkg) => ({
              id: pkg.id,
              title: pkg.title,
              description: pkg.description,
              icon: pkg.icon,
              selectedIcon: pkg.selectedIcon,
            }))}
            selectedId={selectedPackageId}
            onSelect={handlePackageSelect}
          />
        </div>

        {/* ── 가운데: Service (Figma 469/2391 = 19.62%) ── */}
        <div style={{
          flex: "469 1 0",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          minWidth: "250px",
        }}>
          <FeatureSection
            title="02 Service"
            features={availableServices}
            selectedId={selectedServiceId}
            onSelect={handleServiceSelect}
          />
        </div>

        {/* ── 오른쪽: Hero + Table (나머지 ~60.7%) ── */}
        {/*
         * Figma: Fill #F5F5F5 r=36 + Glass Effect white r=36
         * padding 28px, gap 21px
         */}
        <div
          className="figma-nine-slice figma-home-panel-right"
          style={{
            flex: "1452 1 0",
            minWidth: "500px",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            padding: "28px",
            borderRadius: "36px",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "21px", flex: 1, overflowY: "auto", minHeight: 0 }}>
            {rightPanelContent ? (
              <>
                <HeroPanel
                  title={rightPanelContent.title}
                  description={rightPanelContent.description}
                  imageUrl={rightPanelContent.imageUrl}
                  videoUrl={rightPanelContent.videoUrl}
                  serviceId={selectedServiceId}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, minHeight: 0 }}>
                  <SimulationSearch />
                  <SimulationTable serviceId={selectedServiceId} />
                </div>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                <p style={{ fontFamily: "Inter", fontSize: "19.5px", fontWeight: 600, color: "#828993", letterSpacing: "-0.585px" }}>
                  {selectedPackageId ? "Service를 선택해주세요." : "Package를 선택해주세요."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
