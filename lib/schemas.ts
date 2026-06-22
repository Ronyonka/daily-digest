import { z } from "zod";

export const CalendarEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  startTime: z.string().datetime({ offset: true }),
  endTime: z.string().datetime({ offset: true }),
  attendees: z.array(z.string()),
  location: z.string().optional(),
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;

export const EmailItemSchema = z.object({
  id: z.string(),
  subject: z.string(),
  sender: z.string(),
  snippet: z.string(),
  urgency: z.enum(["low", "medium", "high"]),
  receivedAt: z.string().datetime({ offset: true }),
  isFlagged: z.boolean(),
});

export type EmailItem = z.infer<typeof EmailItemSchema>;

export const HarvestItemSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  hoursLogged: z.number().nonnegative(),
  budgetedHours: z.number().positive(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.string(),
});

export type HarvestItem = z.infer<typeof HarvestItemSchema>;

export const MatterItemSchema = z.object({
  id: z.string(),
  matterName: z.string(),
  clientName: z.string(),
  status: z.string(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  nextAction: z.string(),
});

export type MatterItem = z.infer<typeof MatterItemSchema>;
