
import {
  BriefcaseBusiness,
  Coffee,
  MessageCircle,
  Plane,
  type LucideIcon,
} from "lucide-react";

export type PracticeQuestion = {
  id: string;
  situation: string;
  example: string;
};

export type Scenario = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  situation: string;
  example: string;
  questions: PracticeQuestion[];
};

export const scenarios: Scenario[] = [
  {
    id: "cafe",
    icon: Coffee,
    title: "카페 영어",
    description: "주문과 고객 응대",
    situation: "카페에서 주문을 변경하고 싶어요. 직원에게 영어로 말해보세요.",
    example: "I'd like to change my order, please.",
    questions: [
      {
        id: "cafe-01",
        situation: "카페에서 주문을 변경하고 싶어요. 직원에게 영어로 말해보세요.",
        example: "I'd like to change my order, please.",
      },
      {
        id: "cafe-02",
        situation: "음료에 우유가 들어가는지 직원에게 물어보세요.",
        example: "Does this drink contain milk?",
      },
      {
        id: "cafe-03",
        situation: "주문한 음식을 포장해 달라고 요청해 보세요.",
        example: "Could I get this to go, please?",
      },
    ],
  },
  {
    id: "travel",
    icon: Plane,
    title: "여행 영어",
    description: "공항과 여행 상황",
    situation: "공항에 가는 가장 쉬운 방법을 물어보세요.",
    example: "What's the easiest way to get to the airport?",
    questions: [
      {
        id: "travel-01",
        situation: "공항에 가는 가장 쉬운 방법을 물어보세요.",
        example: "What's the easiest way to get to the airport?",
      },
      {
        id: "travel-02",
        situation: "호텔 체크인이 몇 시부터 가능한지 물어보세요.",
        example: "What time can I check in?",
      },
      {
        id: "travel-03",
        situation: "가장 가까운 지하철역이 어디인지 물어보세요.",
        example: "Where is the nearest subway station?",
      },
    ],
  },
  {
    id: "daily",
    icon: MessageCircle,
    title: "일상 영어",
    description: "친구와 일상 대화",
    situation: "친구에게 주말에 무엇을 했는지 물어보세요.",
    example: "What did you do over the weekend?",
    questions: [
      {
        id: "daily-01",
        situation: "친구에게 주말에 무엇을 했는지 물어보세요.",
        example: "What did you do over the weekend?",
      },
      {
        id: "daily-02",
        situation: "친구에게 요즘 어떻게 지내는지 물어보세요.",
        example: "How have you been lately?",
      },
      {
        id: "daily-03",
        situation: "친구에게 이번 주말에 시간이 있는지 물어보세요.",
        example: "Are you free this weekend?",
      },
    ],
  },
  {
    id: "work",
    icon: BriefcaseBusiness,
    title: "직장 영어",
    description: "업무와 회의 표현",
    situation: "동료에게 회의 시간을 변경할 수 있는지 정중하게 물어보세요.",
    example: "Could we reschedule the meeting?",
    questions: [
      {
        id: "work-01",
        situation: "동료에게 회의 시간을 변경할 수 있는지 정중하게 물어보세요.",
        example: "Could we reschedule the meeting?",
      },
      {
        id: "work-02",
        situation: "동료에게 자료를 이메일로 보내달라고 요청해 보세요.",
        example: "Could you send me the document by email?",
      },
      {
        id: "work-03",
        situation: "회의에서 질문 하나 해도 되는지 물어보세요.",
        example: "May I ask a question?",
      },
    ],
  },
];
