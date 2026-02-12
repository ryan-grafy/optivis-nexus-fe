# TSI (Target Subgroup Identification) - AGENTS.md

**Path:** `src/app/tsi/`  
**Type:** Next.js App Router Pages  
**Complexity:** High (8 files, ~5,374 lines)

---

## OVERVIEW

TSI 워크플로우는 임상시험 대상자의 서브그룹을 식별하는 기능을 제공합니다. 데이터 설정부터 결과 리포트까지 6단계로 구성된 wizard 형태의 UI입니다.

---

## STRUCTURE

```
src/app/tsi/
├── page.tsx                    # 데이터 설정 (Data Setting)
├── filter/
│   └── page.tsx               # 환자 필터링 (Filter)
├── patients-summary/
│   └── page.tsx               # 환자 요약 (Patients Summary)
├── basis-selection/
│   └── page.tsx               # 기준 선택 (Basis Selection)
├── subgroup-selection/
│   └── page.tsx               # 서브그룹 선택 (1,894 lines)
├── subgroup-explain/
│   └── page.tsx               # 서브그룹 설명 (Subgroup Explain)
├── refine-cutoffs/
│   └── page.tsx               # 컷오프 조정 (1,894 lines)
└── report/
    └── page.tsx               # 결과 리포트 (Report)
```

---

## WHERE TO LOOK

| 페이지 | 파일 | 설명 |
|--------|------|------|
| **Data Setting** | `page.tsx` | 파일 업로드, 데이터 목록 표시 |
| **Filter** | `filter/page.tsx` | 포함/제외 기준 필터링 UI |
| **Patients Summary** | `patients-summary/page.tsx` | 선택된 환자 요약 정보 |
| **Basis Selection** | `basis-selection/page.tsx` | 분석 기준 선택 (Prognostic, Drug Responsiveness 등) |
| **Subgroup Selection** | `subgroup-selection/page.tsx` | 서브그룹 조건 설정 (대형 파일) |
| **Subgroup Explain** | `subgroup-explain/page.tsx` | AI 기반 서브그룹 설명 |
| **Refine Cutoffs** | `refine-cutoffs/page.tsx` | 임계값 미세 조정 (대형 파일) |
| **Report** | `report/page.tsx` | 최종 분석 결과 리포트 |

---

## CONVENTIONS

### 페이지 레이아웃 패턴

모든 TSI 페이지는 공통 레이아웃을 따릅니다:

```tsx
<div className="w-full flex flex-col items-center">
  <div className="w-[1772px] h-[980px] flex-shrink-0 mx-auto">
    {/* 배경 및 컨텐츠 */}
  </div>
</div>
```

### 헤더 사용

TSI 전용 헤더 컴포넌트 사용:
```tsx
import { TSIHeader } from "@/components/layout/TSIHeader";

// page.tsx 낸부에서 자동으로 헤더 표시됨
```

### 단계 이동

```tsx
const router = useRouter();

// 다음 단계로 이동
router.push("/tsi/filter");

// 이전 단계로 이동
router.back();
```

---

## ANTI-PATTERNS

### 대형 파일 주의
- `subgroup-selection/page.tsx` (~1,894 lines)
- `refine-cutoffs/page.tsx` (~1,894 lines)

**권장:** 
- 복잡한 로직은 custom hook으로 분리
- UI 컴포넌트는 `src/components/`로 이동
- 타입 정의는 `src/types/`로 분리

### 상태 관리
- 페이지 간 상태는 URL 파라미터 또는 Zustand 사용
- 로컬 상태는 `useState` 사용 (복잡한 경우 context 고려)

---

## BREADCRUMB STEPS

TSIHeader의 breadcrumb 순서:

1. **Data Setting** (`/tsi`)
2. **Filter** (`/tsi/filter`)
3. **Patients Summary** (`/tsi/patients-summary`)
4. **Basis Selection** (`/tsi/basis-selection`)
5. **Subgroup Selection** (`/tsi/subgroup-selection`)
6. **Subgroup Explain** (`/tsi/subgroup-explain`)
7. **Refine Cutoffs** (`/tsi/refine-cutoffs`)
8. **Report** (`/tsi/report`)

---

## NOTES

- 모든 페이지는 고정 너비 `1772px` 사용
- 배경 이미지는 `public/assets/tsi/`에서 로드
- 차트는 ECharts 사용 (`src/components/charts/`)
- 저장 버튼 이미지: `/assets/tsi/save-btn.png`
