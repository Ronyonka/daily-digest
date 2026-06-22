import type { SlackWebhookPayload } from "@/lib/slack-formatter";

export async function postToSlack(payload: SlackWebhookPayload) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("SLACK_WEBHOOK_URL is not set");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Slack webhook failed with status ${response.status}${responseText ? `: ${responseText}` : ""}`,
    );
  }
}
