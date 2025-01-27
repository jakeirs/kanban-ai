import { v } from "convex/values";
import { Table } from "convex-helpers/server";
import { eventValidator } from "./types";

// Define the events table
export const eventsTable = Table("events", {
  events: v.array(eventValidator),
  userId: v.id("users"),
});
