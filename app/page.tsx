"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

import ScenarioCard from "./components/ScenarioCard";
import PracticePanel from "./components/PracticePanel";
import { scenarios } from "./data/scenarios";
import { usePracticeSession } from "./hooks/usePracticeSession";

const learningSteps = [
  {
    step: "01",
    title: "Practice",
    description: "상황에 맞는 영어 문장을 직접 작성해요.",
  },
  {
    step: "02",
    title: "Correct",
    description: "AI 첨삭으로 문법과 자연스러운 표현을 배워요.",
  },
  {
    step: "03",
    title: "Repeat",
    description: "여러 문제를 연습하고 다시 도전해요.",
  },
];

export default function Home() {
  const {
    selectedId,
    selectedScenario,
    questionIndex,
    totalQuestions,
    currentQuestion,
    isLastQuestion,
    progress,
    isPracticing,
    isCompleted,
    answer,
    showExample,
    feedbackIsPending,
    feedbackError,
    feedbackMessage,
    feedbackResult,
    feedbackOriginalAnswer,
    selectScenario,
    handleStart,
    handleAnswerChange,
    handleShowExample,
    handlePrevious,
    handleNext,
    handleRestart,
  } = usePracticeSession();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen size={23} strokeWidth={2.2} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              speakloop<span className="text-accent">.</span>
            </span>
          </div>

          <span className="text-sm text-muted">Practice English</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
        <section className="mb-12">
          <span className="mb-4 inline-flex rounded-full bg-primary/25 px-4 py-2 text-xs font-semibold">
            YOUR DAILY ENGLISH PRACTICE
          </span>

          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            영어가 입에 붙을 때까지,
            <br />
            <span className="text-accent">한 문장씩.</span>
          </h1>

          <p className="max-w-xl text-base leading-7 text-muted">
            실제 생활에서 자주 마주치는 상황을 선택하고
            <br className="hidden sm:block" />
            영어로 직접 표현해 보세요.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">상황별 영어 연습</h2>

              <span className="text-sm text-muted">
                {scenarios.length} Categories
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {scenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  icon={scenario.icon}
                  title={scenario.title}
                  description={scenario.description}
                  isSelected={selectedId === scenario.id}
                  onClick={() => selectScenario(scenario.id)}
                />
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4">
            {isCompleted ? (
              <section className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-border bg-surface p-8 text-center shadow-sm">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/25">
                  <CheckCircle2
                    size={34}
                    strokeWidth={1.8}
                    className="text-foreground"
                    aria-hidden="true"
                  />
                </div>

                <h2 className="mb-3 text-2xl font-bold">학습 완료!</h2>

                <p className="mb-2 text-muted">
                  {selectedScenario.title}의 모든 문제를 연습했어요.
                </p>

                <p className="mb-8 text-sm text-muted">
                  총 {totalQuestions}개 문제 학습
                </p>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold transition-colors hover:bg-primary-hover"
                >
                  <RotateCcw size={18} aria-hidden="true" />
                  다시 연습하기
                </button>
              </section>
            ) : (
              <>
                {isPracticing && (
                  <div className="rounded-2xl border border-border bg-surface p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold">학습 진행률</span>

                      <span className="text-sm text-muted">
                        {questionIndex + 1} / {totalQuestions}
                      </span>
                    </div>

                    <div
                      role="progressbar"
                      aria-label="현재 문제 진행률"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(progress)}
                      className="h-2 overflow-hidden rounded-full bg-background"
                    >
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <PracticePanel
                  icon={selectedScenario.icon}
                  title={selectedScenario.title}
                  situation={currentQuestion.situation}
                  example={currentQuestion.example}
                  isPracticing={isPracticing}
                  answer={answer}
                  showExample={showExample}
                  feedbackIsPending={feedbackIsPending}
                  feedbackError={feedbackError}
                  feedbackMessage={feedbackMessage}
                  feedbackResult={feedbackResult}
                  feedbackOriginalAnswer={feedbackOriginalAnswer}
                  onStart={handleStart}
                  onAnswerChange={handleAnswerChange}
                  onShowExample={handleShowExample}
                />

                {isPracticing && (
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={questionIndex === 0 || feedbackIsPending}
                      className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowLeft size={18} aria-hidden="true" />
                      이전 문제
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!showExample || feedbackIsPending}
                      className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isLastQuestion ? "학습 완료" : "다음 문제"}
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold">How SpeakLoop Works</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {learningSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <span className="mb-4 block text-sm font-bold text-accent">
                  {item.step}
                </span>

                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>

                <p className="text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-muted">
            Gemini AI를 활용한 영어 문장 첨삭 기능을 제공합니다. 학습 기록 저장
            및 복습 기능은 추후 추가될 예정입니다.
          </p>
        </section>
      </div>
    </main>
  );
}
