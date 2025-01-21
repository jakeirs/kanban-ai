import { Table,  } from "convex-helpers/server";
import { v,  } from "convex/values";
import {
  eventValidator,
  noteValidator,
  projectDetailsValidator,
} from "./types";

export const ProjectValidator = v.object({
  events: v.array(eventValidator),
  notes: v.array(noteValidator),
  projectDetail: projectDetailsValidator,
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.number()),
});

export const projectsTable = Table("projects", {
  userId: v.id("users"),
  projects: v.array(ProjectValidator),
});
