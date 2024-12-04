import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    stripeCheckoutId: v.optional(v.string()),
  }).index("by_email", ["email"]),

  kanbanColumns: defineTable({
    title: v.string(),
    order: v.number(), // To maintain column order
    identifier: v.string(), // e.g., "todo", "inProgress", "done"
  }).index("by_identifier", ["identifier"]),

  kanbanItems: defineTable({
    content: v.string(),
    columnId: v.id("kanbanColumns"),
    order: v.number(), // To maintain item order within column
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.optional(v.id("users")),
    // Additional optional fields that might be useful
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    labels: v.optional(v.array(v.string())),
    priority: v.optional(v.string()),
  })
    .index("by_column", ["columnId"])
});
