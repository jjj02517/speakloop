import { CheckCircle2, Lightbulb, MessageCircle, Sparkles } from "lucide-react";

export type FeedbackResultData = {
  feedbackType: "correct" | "minor" | "needs_improvement";
  correctedSentence: string;
  explanationKo: string;
  alternativeSentence: string;
  focusPoints: string[];
};

type FeedbackResultProps = {
  originalAnswer: string;
  result: FeedbackResultData;
};

const feedbackLabels: Record<FeedbackResultData["feedbackType"], string> = {
  correct: "자연스러운 문장이에요",
  minor: "조금 더 자연스럽게",
  needs_improvement: "문장 개선 필요",
};

export default function FeedbackResult({
  originalAnswer,
  result,
}: FeedbackResultProps) {
  const isCorrect = result.feedbackType === "correct";

  return (
    <section
      aria-label="영어 첨삭 결과"
      className="space-y-5 rounded-2xl border border-border bg-surface p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-accent" aria-hidden="true" />

          <h3 className="font-bold">AI Feedback</h3>
        </div>

        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          {feedbackLabels[result.feedbackType]}
        </span>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted">MY ANSWER</p>

        <p className="leading-7 text-foreground">{originalAnswer}</p>
      </div>

      <div className="rounded-xl bg-accent/10 p-4">
        <div className="mb-2 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-accent" aria-hidden="true" />

          <p className="text-xs font-semibold text-accent">
            {isCorrect ? "NATURAL SENTENCE" : "CORRECTED SENTENCE"}
          </p>
        </div>

        <p className="font-semibold leading-7">{result.correctedSentence}</p>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <Lightbulb size={18} className="text-accent" aria-hidden="true" />

          <h4 className="text-sm font-bold">첨삭 설명</h4>
        </div>

        <p className="text-sm leading-7 text-muted">{result.explanationKo}</p>
      </div>

      <div className="border-t border-border pt-4">
        <div className="mb-2 flex items-center gap-2">
          <MessageCircle size={18} className="text-accent" aria-hidden="true" />

          <h4 className="text-sm font-bold">다른 자연스러운 표현</h4>
        </div>

        <p className="text-sm font-medium leading-7">
          {result.alternativeSentence}
        </p>
      </div>

      {result.focusPoints.length > 0 && (
        <div className="border-t border-border pt-4">
          <h4 className="mb-3 text-sm font-bold">학습 포인트</h4>

          <ul className="space-y-2">
            {result.focusPoints.map((point, index) => (
              <li
                key={`${index}-${point}`}
                className="flex items-start gap-2 text-sm leading-6 text-muted"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />

                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
