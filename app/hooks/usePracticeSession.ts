"use client";

import { useState } from "react";
import { scenarios } from "../data/scenarios";
import { useFeedbackMutation } from "./useFeedbackMutation";

export function usePracticeSession() {
  const [selectedId, setSelectedId] = useState("cafe");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answer, setAnswer] = useState("");

  const feedbackMutation = useFeedbackMutation();

  const selectedScenario =
    scenarios.find((scenario) => scenario.id === selectedId) ?? scenarios[0];

  const totalQuestions = selectedScenario.questions.length;
  const currentQuestion = selectedScenario.questions[questionIndex];
  const isLastQuestion = questionIndex === totalQuestions - 1;
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  const showExample =
    feedbackMutation.isSuccess &&
    feedbackMutation.data?.questionId === currentQuestion.id &&
    feedbackMutation.data?.originalAnswer === answer.trim();

  const feedbackResult = showExample
    ? (feedbackMutation.data?.feedback ?? null)
    : null;

  const feedbackOriginalAnswer = showExample
    ? (feedbackMutation.data?.originalAnswer ?? null)
    : null;

  const resetAnswer = () => {
    setAnswer("");
    feedbackMutation.reset();
  };

  const selectScenario = (id: string) => {
    setSelectedId(id);
    setQuestionIndex(0);
    setIsPracticing(false);
    setIsCompleted(false);
    resetAnswer();
  };

  const handleStart = () => {
    setIsPracticing(true);
    setIsCompleted(false);
  };

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    feedbackMutation.reset();
  };

  const handleShowExample = () => {
    if (!isPracticing || !answer.trim() || feedbackMutation.isPending) {
      return;
    }

    feedbackMutation.mutate({
      questionId: currentQuestion.id,
      answer: answer.trim(),
    });
  };

  const handlePrevious = () => {
    if (questionIndex === 0 || feedbackMutation.isPending) {
      return;
    }

    setQuestionIndex((prev) => prev - 1);
    resetAnswer();
  };

  const handleNext = () => {
    if (!showExample || feedbackMutation.isPending) {
      return;
    }

    if (isLastQuestion) {
      setIsPracticing(false);
      setIsCompleted(true);
      return;
    }

    setQuestionIndex((prev) => prev + 1);
    resetAnswer();
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setIsCompleted(false);
    setIsPracticing(true);
    resetAnswer();
  };

  return {
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
    feedbackResult,
    feedbackOriginalAnswer,
    feedbackIsPending: feedbackMutation.isPending,
    feedbackError: feedbackMutation.error?.message ?? null,
    feedbackMessage: showExample
      ? (feedbackMutation.data?.message ?? null)
      : null,
    selectScenario,
    handleStart,
    handleAnswerChange,
    handleShowExample,
    handlePrevious,
    handleNext,
    handleRestart,
  };
}
