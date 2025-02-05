import { z } from "zod";

const dateStringZod = z
  .string()
  .describe(
    `date string (e.g., 'Mon Feb 03 2025 15:25:52 GMT+0700') that can be parsed to Unix timestamp`
  );

export const eventFromLLMGenUiZod = z.object({
  title: z.string().describe(`Title of the event.`),
  description: z.string().describe(`Description of the event.`),
  time: z
    .object({
      endTime: dateStringZod,
      startTime: dateStringZod,
    })
    .describe("object of when event starts and ends"),
});

export const eventToUpdateFieldsZod = z
  .object({
    title: z.optional(z.string().describe(`Title of the event.`)),
    description: z.optional(z.string().describe(`Description of the event.`)),
    time: z.optional(
      z
        .object({
          endTime: z.optional(dateStringZod),
          startTime: z.optional(dateStringZod),
        })
        .describe("object of when event starts and ends")
    ),
  })
  .describe(
    "Fill only those fields that user has requested to change. Give me the output"
  );

export type EventFromLLMGenUI = z.infer<typeof eventFromLLMGenUiZod>;

export const eventActionZod = z.object({
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
    .describe("action that user requested"),
});

export const eventsByActionZod = z
  .object({
    events: z
      .array(
        z
          .object({
            action: eventActionZod.shape.action,
            ...eventFromLLMGenUiZod.shape,
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
