import { z } from "zod";
import { cleanAndParseString } from "./utils";

export const eventFromLLMGenUiZod = z.object({
  id: z.string().describe(
    `Take the same Id of the event from the JSON, which is the current state of user's calendar.
      When you want to update or delete events.`
  ),
  title: z.string()
    .describe(`Title of the event. If this is updated or deleted item, Title has to 
    correspond to existing events from the calendar of the user. Match with id`),
  description: z.string().describe(
    `Description of the event.
      If is updated or deleted item, description has to 
      correspond to existing events from the calendar of the user. Match with id`
  ),
  updatedAt: z.string().describe(
    `date string (e.g., 'Mon Feb 03 2025 15:25:52 GMT+0700') that can be parsed to Unix timestamp
      If is updated or deleted item, updatedAt has to 
      correspond to existing events from the calendar of the user. Match with id
      `
  ),

  time: z
    .object({
      endTime: z.string()
        .describe(`date string (e.g., 'Mon Feb 03 2025 15:25:52 GMT+0700)
          If is updated or deleted item, endTime has to 
          correspond to existing events from the calendar of the user. Match with id`),
      startTime: z.string()
        .describe(`date string (e.g., 'Mon Feb 03 2025 15:25:52 GMT+0700')
          If is updated or deleted item, startTime has to 
          correspond to existing events from the calendar of the user. Match with id`),
    })
    .describe("object of when event starts and ends"),
});

export type EventFromLLMGenUI = z.infer<typeof eventFromLLMGenUiZod>;

export const eventsByActionZod = z
  .object({
    events: z
      .array(
        z
          .object({
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
            events: z.preprocess(
              cleanAndParseString,
              z.array(eventFromLLMGenUiZod)
            ),
          })
          .describe(
            "Javascript object with two properties: action and events. It's not string! Never use /n \n"
          )
      )
      .describe(
        "Array of JavaScript Objects: {events, actions} that are categorized based on the actions: created | updated | deleted It's not string! Never use /n \n"
      ),
  })
  .describe(
    "Nested JavaScript Objects with 4 levels of nesting It's not string! Never use /n \n"
  );
