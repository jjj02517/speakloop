"use client";

import { Turnstile } from "@marsidev/react-turnstile";

type TurnstileWidgetProps = {
  onTokenChange: (token: string | null) => void;
  resetKey?: number;
};

export default function TurnstileWidget({
  onTokenChange,
  resetKey = 0,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return (
      <p role="alert" className="text-sm text-red-600">
        보안 인증 설정을 불러올 수 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Turnstile
        key={resetKey}
        siteKey={siteKey}
        options={{
          theme: "light",
          size: "normal",
        }}
        onSuccess={(token) => {
          onTokenChange(token);
        }}
        onExpire={() => {
          onTokenChange(null);
        }}
        onError={() => {
          onTokenChange(null);
        }}
      />

      <p className="text-center text-xs text-muted">
        안전한 AI 첨삭을 위해 보안 인증을 진행합니다.
      </p>
    </div>
  );
}
