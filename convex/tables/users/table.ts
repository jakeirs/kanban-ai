import { Table } from "convex-helpers/server";
import { v } from "convex/values";

export const userTable = Table("users", {
  email: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
});
