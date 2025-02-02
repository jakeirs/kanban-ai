import { z } from "zod";
import { eventFromLLMGenUiZod } from "../calendarTool/types";

export const idsOfTasksThatWillBeAffectedZod = z
  .array(
    z.object({
      id: z.string().describe("Id of the tasks / item that will be affected"),
      action: z
        .union([
          z
            .literal("created")
            .describe("use this literal for items that was just created"),
          z
            .literal("updated")
            .describe("use this literal for items that was only updated"),
          z
            .literal("deleted")
            .describe("use this literal for items that was deleted"),
        ])
        .describe("action that user"),
    })
  )
  .describe("Array of Ids of the tasks that will be affcted");

export type IdsOfTasksThatWillBeAffected = z.infer<
  typeof idsOfTasksThatWillBeAffectedZod
>;

// Simple and focused schema for confirmation
export const afterConfirmationToolZod = z.object({
  events: z
    .array(
      z.object({
        action: z
          .union([
            z
              .literal("created")
              .describe("use this literal for items that was just created"),
            z
              .literal("updated")
              .describe("use this literal for items that was only updated"),
            z
              .literal("deleted")
              .describe("use this literal for items that was deleted"),
          ])
          .describe("action that user"),
        events: z
          .array(eventFromLLMGenUiZod)
          .describe(
            "Only the List of events that were created | or only updated | or only deleted"
          ),
      })
    )
    .describe(
      "Array of events that are categorized based on the actions: created | updated | deleted"
    ),
});
