import { Infer, v } from "convex/values";

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
  title: v.string(),
  description: v.optional(v.string()),
  updatedAt: v.number(), // Unix timestamp

  time: v.object({
    startTime: v.number(), // Unix timestamp
    endTime: v.number(), // Unix timestamp
  }),

  location: v.optional(v.string()), // Physical or virtual location

  project: v.optional(v.string()), // assignment to the project
  notes: v.optional(v.array(v.string())), // assignment to the project
});

export type EventFromConvex = Infer<typeof eventValidator>;
