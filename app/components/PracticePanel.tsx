"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react";

import FeedbackResult, { type FeedbackResultData } from "./FeedbackResult";

type PracticePanelProps = {
  icon: LucideIcon;
  title: string;
  situation: string;
  example: string;
  isPracticing: boolean;
  answer: string;
  showExample: boolean;
  feedbackIsPending?: boolean;
  feedbackError?: string | null;
  feedbackMessage?: string | null;
  feedbackResult?: FeedbackResultData | null;
  feedbackOriginalAnswer?: string | null;
  onStart: () => void;
  onAnswerChange: (value: string) => void;
  onShowExample: () => void;
};

export default function PracticePanel({
  icon: Icon,
  title,
  situation,
  example,
  isPracticing,
  answer,
  showExample,
  feedbackIsPending = false,
  feedbackError = null,
  feedbackMessage = null,
  feedbackResult = null,
  feedbackOriginalAnswer = null,
  onStart,
  onAnswerChange,
  onShowExample,
}: PracticePanelProps) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          BEGINNER
        </span>

        <span className="text-sm text-muted">{title}</span>
      </div>

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/25">
        <Icon
          size={30}
          strokeWidth={1.8}
          className="text-foreground"
          aria-hidden="true"
        />
      </div>

      <h2 className="mb-3 text-2xl font-bold">오늘의 회화 연습</h2>

      <p className="mb-6 leading-7 text-muted">{situation}</p>

      {!isPracticing ? (
        <button
          type="button"
          onClick={onStart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-semibold transition-colors hover:bg-primary-hover"
        >
          연습 시작하기
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      ) : (
        <div className="space-y-4">
          <label
            htmlFor="english-answer"
            className="block text-sm font-semibold"
          >
            영어로 답변해 보세요
          </label>

          <textarea
            id="english-answer"
            value={answer}
            onChange={(event) => onAnswerChange(event.target.value)}
            disabled={feedbackIsPending}
            placeholder="Type your answer in English..."
            rows={4}
            maxLength={1000}
            className="w-full resize-none rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-accent disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            disabled={!answer.trim() || feedbackIsPending}
            onClick={onShowExample}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-semibold transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {feedbackIsPending ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                  aria-hidden="true"
                />
                답변 전송 중...
              </>
            ) : (
              <>
                참고 표현 확인하기
                <ArrowRight size={18} aria-hidden="true" />
              </>
            )}
          </button>

          {feedbackIsPending && (
            <p role="status" className="text-center text-sm text-muted">
              서버에서 답변을 처리하고 있습니다.
            </p>
          )}

          {feedbackError && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle size={20} className="shrink-0" aria-hidden="true" />

              <div>
                <p className="font-semibold">답변을 전송하지 못했습니다.</p>

                <p className="mt-1">{feedbackError}</p>
              </div>
            </div>
          )}

          {showExample && (
            <div className="space-y-4">
              {feedbackResult && feedbackOriginalAnswer ? (
                <>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <p className="mb-1 text-sm font-semibold">
                      Mock 첨삭 미리보기
                    </p>

                    <p className="text-xs leading-5 text-muted">
                      현재는 실제 AI가 입력한 문장을 분석하지 않습니다. 학습
                      문제별로 준비한 예시 첨삭 결과를 보여줍니다.
                    </p>
                  </div>

                  <FeedbackResult
                    originalAnswer={feedbackOriginalAnswer}
                    result={feedbackResult}
                  />
                </>
              ) : (
                <div className="rounded-xl bg-accent/10 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2
                      size={18}
                      className="text-accent"
                      aria-hidden="true"
                    />

                    <span className="text-xs font-semibold text-accent">
                      REFERENCE EXPRESSION
                    </span>
                  </div>

                  <p className="mb-3 font-semibold">{example}</p>

                  {feedbackMessage && (
                    <p className="mb-3 text-sm text-muted">{feedbackMessage}</p>
                  )}

                  <p className="text-xs leading-5 text-muted">
                    현재는 참고 문장만 제공하며, 실제 AI 첨삭은 이후 연결할
                    예정입니다.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
