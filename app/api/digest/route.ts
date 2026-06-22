import { NextResponse } from "next/server";

import { getTodaysDigest } from "@/lib/aggregator";
import { postToSlack } from "@/lib/slack-client";
import { buildSlackBlocks } from "@/lib/slack-formatter";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const digest = getTodaysDigest();
    const payload = buildSlackBlocks(digest);

    await postToSlack(payload);

    return NextResponse.json({
      ok: true,
      message: "Digest sent to Slack",
      counts: {
        calendar: digest.calendar.length,
        email: digest.email.length,
        fathom: digest.fathom.length,
        harvest: digest.harvest.length,
        matters: digest.matters.length,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown digest error";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
