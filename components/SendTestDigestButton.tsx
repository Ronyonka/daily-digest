"use client";

import { useState } from "react";

type FeedbackState =
  | { kind: "idle"; message: string }
  | { kind: "loading"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function SendTestDigestButton() {
  const [feedback, setFeedback] = useState<FeedbackState>({
    kind: "idle",
    message: "",
  });

  async function handleClick() {
    setFeedback({ kind: "loading", message: "Sending test digest..." });

    try {
      const response = await fetch("/api/digest");
      const payload = (await response.json()) as
        | { ok: true; message?: string }
        | { ok: false; error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(
          payload.ok ? "Digest request failed." : payload.error ?? "Digest request failed."
        );
      }

      setFeedback({
        kind: "success",
        message: payload.message ?? "Test digest sent.",
      });
    } catch (error) {
      setFeedback({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong sending the test digest.",
      });
    }
  }

  const isBusy = feedback.kind === "loading";

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isBusy}
        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isBusy ? "Sending..." : "Send test digest"}
      </button>
      {feedback.kind !== "idle" ? (
        <p
          className={`text-xs font-medium ${
            feedback.kind === "success"
              ? "text-emerald-700"
              : feedback.kind === "error"
                ? "text-rose-700"
                : "text-slate-600"
          }`}
          aria-live="polite"
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}
