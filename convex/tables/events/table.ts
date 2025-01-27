import { defineTable } from "convex/server";
import { v } from "convex/values";
import { eventValidator } from "./types";

// Define the events table
export const EventValidator = eventValidator;

export default defineTable(eventValidator)
  .index("byUsers", ["userId"])
  .index("byStartTime", ["time.startTime"]);
