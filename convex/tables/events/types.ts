import { Infer, v } from "convex/values";
import { EventValidator } from "./table";

// Define event priority
export const priorityEnum = v.union(
  v.literal("low"),
  v.literal("medium"),
  v.literal("high")
);

// Define recurrence type
export const recurrenceTypeEnum = v.union(
  v.literal("daily"),
  v.literal("weekly"),
  v.literal("monthly"),
  v.literal("yearly"),
  v.literal("custom")
);

// EVENTS
export const eventValidator = v.object({
  id: v.string(),
  userId: v.id("users"),
  title: v.string(),
  description: v.optional(v.string()),
  updatedAt: v.number(), // Unix timestamp

  time: v.object({
    startTime: v.number(), // Unix timestamp
    endTime: v.number(), // Unix timestamp
    recurrence: v.optional(
      v.object({
        type: recurrenceTypeEnum,
        interval: v.number(), // e.g., every 2 weeks: interval: 2, type: "weekly"
        endDate: v.optional(v.number()), // Optional end date for recurring events
        exceptions: v.optional(v.array(v.number())), // Array of Unix timestamps (excluded dates)
      })
    ),
  }),

  location: v.optional(v.string()), // Physical or virtual location

  project: v.optional(v.string()), // assignment to the project
  notes: v.optional(v.array(v.string())), // assignment to the project
});
export type Event = Infer<typeof EventValidator>;
