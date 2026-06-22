import fs from "fs";
import path from "path";
import { z } from "zod";

import {
  CalendarEventSchema,
  EmailItemSchema,
  FathomMeetingSchema,
  HarvestItemSchema,
  MatterItemSchema,
  type CalendarEvent,
  type EmailItem,
  type FathomMeeting,
  type HarvestItem,
  type MatterItem,
} from "@/lib/schemas";

export interface DigestData {
  calendar: CalendarEvent[];
  email: EmailItem[];
  fathom: FathomMeeting[];
  harvest: HarvestItem[];
  matters: MatterItem[];
}

function loadMockData<T>(filename: string, schema: z.ZodType<T>): T {
  const filePath = path.join(process.cwd(), "data", filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return schema.parse(JSON.parse(raw));
}

export function getTodaysDigest(): DigestData {
  return {
    calendar: loadMockData("calendar.json", z.array(CalendarEventSchema)),
    email: loadMockData("email.json", z.array(EmailItemSchema)),
    fathom: loadMockData("fathom.json", z.array(FathomMeetingSchema)),
    harvest: loadMockData("harvest.json", z.array(HarvestItemSchema)),
    matters: loadMockData("matters.json", z.array(MatterItemSchema)),
  };
}

export function getDigestData(): DigestData {
  return getTodaysDigest();
}
