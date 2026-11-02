# SpeakLoop

**AI-powered English Conversation Practice**

SpeakLoop는 일상생활에서 마주치는 다양한 상황을 바탕으로 영어 문장을 직접 작성하고, AI 첨삭을 통해 자연스러운 표현을 학습하는 웹 애플리케이션입니다.

React와 Next.js 학습을 목적으로 시작했으며, 실제 AI API 연동부터 서버 보안, 요청 제한, 배포까지 구현한 개인 프로젝트입니다.

## Live Demo

- Website: https://speakloop-three.vercel.app/
- GitHub: https://github.com/jjj02517/speakloop

## 주요 기능

### 1. 상황별 영어 회화 연습

- 카페, 여행, 일상, 직장 총 4개 카테고리
- 카테고리별 3개의 학습 문제 제공
- 상황에 맞는 영어 문장 직접 작성
- 문제별 학습 진행률 표시

### 2. Gemini AI 영어 첨삭

- 작성한 문장의 문법과 자연스러움 분석
- 교정된 영어 문장 제공
- 한국어 첨삭 설명
- 다른 자연스러운 영어 표현 제안
- 핵심 학습 포인트 제공

### 3. API 보안 및 요청 제한

- Cloudflare Turnstile을 이용한 봇 인증
- Next.js 서버에서 인증 토큰 검증
- Upstash Redis 기반 API 요청 횟수 제한
- IP별 요청 제한 및 서비스 전체 사용량 제한
- API 키 서버 환경 변수 관리

## 기술 스택

| Category      | Technology                |
| ------------- | ------------------------- |
| Frontend      | React, Next.js App Router |
| Language      | TypeScript                |
| Styling       | Tailwind CSS              |
| Server State  | TanStack React Query      |
| AI            | Google Gemini API         |
| Backend       | Next.js Route Handlers    |
| Security      | Cloudflare Turnstile      |
| Rate Limiting | Upstash Redis             |
| Icons         | Lucide React              |
| Deployment    | Vercel                    |

## 프로젝트 구조

```text
app/
├── api/
│   └── feedback/
│       └── route.ts
├── components/
│   ├── FeedbackResult.tsx
│   ├── PracticePanel.tsx
│   ├── ScenarioCard.tsx
│   └── TurnstileWidget.tsx
├── data/
│   └── scenarios.ts
├── hooks/
│   ├── useFeedbackMutation.ts
│   └── usePracticeSession.ts
├── globals.css
├── layout.tsx
├── page.tsx
└── providers.tsx
```

## 주요 구현 내용

### Custom Hook을 활용한 로직 분리

`usePracticeSession`에서 문제 선택, 학습 진행 상태, 사용자 답변 및 첨삭 결과를 관리합니다.

UI 컴포넌트와 학습 로직을 분리하여 유지보수성을 높였습니다.

### TanStack React Query

`useFeedbackMutation`을 통해 AI 첨삭 요청의 비동기 상태를 관리합니다.

- 요청 중 로딩 상태 표시
- 요청 성공 시 AI 첨삭 결과 렌더링
- 요청 실패 시 오류 안내
- 중복 제출 방지

### AI 응답 구조화

Gemini API의 Structured Outputs 기능을 활용하여 첨삭 결과를 일관된 JSON 구조로 반환합니다.

응답 데이터의 타입을 검사한 후 React 컴포넌트에 전달합니다.

### 서버 중심 API 보안

Gemini API 키는 클라이언트에 노출하지 않고 Next.js 서버에서 관리합니다.

AI API 호출 전 Cloudflare Turnstile 토큰을 검증하며, Upstash Redis를 통해 요청 횟수를 제한합니다.

## 로컬 실행

### 1. 프로젝트 설치

```bash
git clone https://github.com/jjj02517/speakloop.git
cd speakloop
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성합니다.

```dotenv
GEMINI_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

각 서비스에서 발급받은 값을 입력해야 하며, 실제 비밀 키는 Git에 커밋하지 않습니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 버전 관리

| Version     | Description                       |
| ----------- | --------------------------------- |
| v0.1.0-mock | Mock AI 첨삭 MVP                  |
| v0.2.0-ai   | Gemini AI 첨삭 및 Redis 요청 제한 |

이후 Cloudflare Turnstile 서버 인증 기능을 추가했습니다.

## 향후 개선 계획

- 학습 기록 저장 기능
- 틀린 문장 복습 기능
- 영어 음성 입력 및 발음 연습
- 학습 통계 대시보드
- 모바일 사용성 개선

## Project Status

개인 포트폴리오 프로젝트로 개발 및 운영 중입니다.

현재는 영어 문장 작성과 AI 첨삭 기능을 제공하며, 학습 기록 저장과 음성 기능은 추후 구현할 예정입니다.
