import type { DigestData } from "@/lib/aggregator";

type SlackTextObject = {
  type: "plain_text" | "mrkdwn";
  text: string;
};

type SlackBlock =
  | {
      type: "header";
      text: SlackTextObject;
    }
  | {
      type: "section";
      text: SlackTextObject;
    }
  | {
      type: "divider";
    }
  | {
      type: "context";
      elements: SlackTextObject[];
    };

export type SlackWebhookPayload = {
  text: string;
  blocks: SlackBlock[];
};

const SLACK_TIME_ZONE = "Africa/Nairobi";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: SLACK_TIME_ZONE,
  }).format(new Date(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: SLACK_TIME_ZONE,
  }).format(new Date(`${value}T00:00:00+03:00`));
}

function formatMoneyHours(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function buildList(lines: string[], emptyMessage: string) {
  return lines.length > 0 ? lines.join("\n") : `- ${emptyMessage}`;
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildSlackBlocks(data: DigestData): SlackWebhookPayload {
  const calendarLines = data.calendar.map(
    (event) =>
      `- ${formatDateTime(event.startTime)}-${formatDateTime(event.endTime)} | ${event.title} (${event.location ?? "No location"})`,
  );
  const emailLines = data.email.map(
    (item) =>
      `- ${item.urgency.toUpperCase()} | ${item.subject} from ${item.sender} ${item.isFlagged ? "[flagged]" : ""}`.trimEnd(),
  );
  const fathomLines = data.fathom.map(
    (meeting) =>
      `- ${meeting.meetingTitle} | ${formatDate(meeting.meetingDate)} | ${truncate(meeting.summary, 145)} | actions: ${truncate(
        meeting.actionItems.slice(0, 2).join("; "),
        145,
      )}${meeting.actionItems.length > 2 ? "; +" + (meeting.actionItems.length - 2) + " more" : ""}`,
  );
  const harvestLines = data.harvest.map(
    (item) =>
      `- ${item.projectName} for ${item.clientName} | ${formatMoneyHours(item.hoursLogged)} / ${formatMoneyHours(item.budgetedHours)} hrs | ${item.status} | due ${formatDate(item.deadline)}`,
  );
  const matterLines = data.matters.map(
    (item) =>
      `- ${item.matterName} for ${item.clientName} | ${item.status} | due ${formatDate(item.deadline)} | next: ${item.nextAction}`,
  );

  const text = `Daily digest: ${data.calendar.length} calendar events, ${data.email.length} emails, ${data.fathom.length} Fathom meetings, ${data.harvest.length} Harvest items, and ${data.matters.length} matters.`;

  return {
    text,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Lawyer Daily Digest",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Generated from the shared dashboard snapshot for ${formatDateTime(data.calendar[0]?.startTime ?? new Date().toISOString())}.`,
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Calendar*\n${buildList(calendarLines, "No calendar events today.")}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Email*\n${buildList(emailLines, "No new email items.")}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Fathom*\n${buildList(fathomLines, "No call notes from yesterday.")}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Harvest*\n${buildList(harvestLines, "No Harvest entries today.")}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Matters*\n${buildList(matterLines, "No matter updates today.")}`,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Mock data is stored in /data and rendered through the shared server-side aggregator.",
          },
        ],
      },
    ],
  };
}
