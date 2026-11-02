"use client";

import { useMutation } from "@tanstack/react-query";
import type { FeedbackResultData } from "../components/FeedbackResult";

type FeedbackRequest = {
  questionId: string;
  answer: string;
};

export type FeedbackResponse = {
  mode: "mock";
  questionId: string;
  originalAnswer: string;
  message: string;
  feedback: FeedbackResultData;
};

async function submitFeedback({
  questionId,
  answer,
}: FeedbackRequest): Promise<FeedbackResponse> {
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questionId,
      answer,
    }),
  });

  if (!response.ok) {
    const errorData: { error?: string } | null = await response
      .json()
      .catch(() => null);

    throw new Error(errorData?.error ?? "답변 전송에 실패했습니다.");
  }

  return response.json() as Promise<FeedbackResponse>;
}

export function useFeedbackMutation() {
  return useMutation({
    mutationFn: submitFeedback,
    retry: false,
  });
}
