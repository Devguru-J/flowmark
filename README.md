# Flowmark

한국어 우선 태스크 관리 웹앱 — 명료함과 속도.

## 구조

- `docs/` — 제품/엔지니어링 문서 (`00_DOCUMENTATION_INDEX.md`가 관리 문서)
- `DESIGN.md` — Stitch 디자인 시스템 정의 (단일 출처)
- `design/` — Stitch 화면 프롬프트와 생성 결과 (PNG/HTML)
- `app/` — 웹앱 (Vite + React + TypeScript)

## 앱 실행

```bash
cd app
pnpm install
pnpm dev        # 개발 서버
pnpm test       # 단위 테스트 (Vitest)
pnpm build      # 타입체크 + 프로덕션 빌드
```

## 스택

TypeScript · React · Vite · TanStack Router/Query · Zustand · React Hook Form · Zod · Tailwind CSS 4 · Radix UI · Lucide · date-fns · i18next (ko 기본 / en)

데이터는 `TaskRepository` 인터페이스 뒤에 있으며 현재 localStorage 어댑터로 동작합니다. Supabase 전환 시 `app/src/features/tasks/data/index.ts`의 `getTaskRepository()`만 교체하면 됩니다. 인증은 모크 세션이며 Supabase Auth로 교체 가능한 구조입니다.
