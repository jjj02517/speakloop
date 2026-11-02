type MockFeedbackExample = {
  correctedSentence: string;
  alternativeSentence: string;
  tip: string;
};

const mockFeedbackExamples: Record<string, MockFeedbackExample> = {
  "cafe-01": {
    correctedSentence: "I'd like to change my order, please.",
    alternativeSentence: "Could I change my order, please?",
    tip: "'I'd like to'는 정중하게 요청할 때 사용하는 표현입니다.",
  },
  "cafe-02": {
    correctedSentence: "Does this drink contain milk?",
    alternativeSentence: "Is there any milk in this drink?",
    tip: "'Does ... contain'은 특정 성분의 포함 여부를 묻는 표현입니다.",
  },
  "cafe-03": {
    correctedSentence: "Could I get this to go, please?",
    alternativeSentence: "Could you pack this to go, please?",
    tip: "'To go'는 음식을 포장할 때 사용하는 표현입니다.",
  },
  "travel-01": {
    correctedSentence: "What's the easiest way to get to the airport?",
    alternativeSentence: "How can I get to the airport?",
    tip: "'The easiest way to'는 가장 쉬운 방법을 물을 때 사용합니다.",
  },
  "travel-02": {
    correctedSentence: "What time can I check in?",
    alternativeSentence: "When does check-in start?",
    tip: "'What time can I'는 가능한 시간을 물어보는 표현입니다.",
  },
  "travel-03": {
    correctedSentence: "Where is the nearest subway station?",
    alternativeSentence: "Is there a subway station nearby?",
    tip: "'The nearest'는 가장 가까운 장소를 나타냅니다.",
  },
  "daily-01": {
    correctedSentence: "What did you do over the weekend?",
    alternativeSentence: "How was your weekend?",
    tip: "지난 주말에 한 일을 물을 때는 과거형 'did'를 사용합니다.",
  },
  "daily-02": {
    correctedSentence: "How have you been lately?",
    alternativeSentence: "How have you been doing?",
    tip: "'How have you been?'은 오랜만에 안부를 물을 때 자연스럽습니다.",
  },
  "daily-03": {
    correctedSentence: "Are you free this weekend?",
    alternativeSentence: "Do you have any plans this weekend?",
    tip: "'Are you free?'는 상대방의 시간이 되는지 물을 때 사용합니다.",
  },
  "work-01": {
    correctedSentence: "Could we reschedule the meeting?",
    alternativeSentence: "Would it be possible to move the meeting?",
    tip: "'Could we'는 업무 상황에서 정중하게 제안할 때 사용합니다.",
  },
  "work-02": {
    correctedSentence: "Could you send me the document by email?",
    alternativeSentence: "Would you mind emailing me the document?",
    tip: "'Could you'는 동료에게 정중하게 부탁할 때 사용합니다.",
  },
  "work-03": {
    correctedSentence: "May I ask a question?",
    alternativeSentence: "Could I ask a quick question?",
    tip: "'May I'는 허락을 구할 때 사용하는 정중한 표현입니다.",
  },
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "올바른 JSON 형식이 아닙니다." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json(
      { error: "요청 데이터가 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const { questionId, answer } = body as Record<string, unknown>;

  if (
    typeof questionId !== "string" ||
    !questionId.trim() ||
    typeof answer !== "string" ||
    !answer.trim()
  ) {
    return Response.json(
      { error: "문제 ID와 영어 답변을 입력해 주세요." },
      { status: 400 },
    );
  }

  if (answer.length > 1000) {
    return Response.json(
      { error: "답변은 1000자 이하로 입력해 주세요." },
      { status: 400 },
    );
  }

  const example = Object.hasOwn(mockFeedbackExamples, questionId)
    ? mockFeedbackExamples[questionId]
    : undefined;

  if (!example) {
    return Response.json(
      { error: "존재하지 않는 학습 문제입니다." },
      { status: 404 },
    );
  }

  return Response.json({
    mode: "mock",
    questionId,
    originalAnswer: answer.trim(),
    message: "Mock 첨삭 예시를 불러왔습니다.",
    feedback: {
      feedbackType: "minor",
      correctedSentence: example.correctedSentence,
      explanationKo:
        "현재는 입력 문장을 실제로 분석하지 않는 Mock 단계입니다. " +
        example.tip,
      alternativeSentence: example.alternativeSentence,
      focusPoints: [example.tip],
    },
  });
}
