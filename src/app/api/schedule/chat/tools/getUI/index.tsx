import { tool } from "ai";
import { z } from "zod";

import { eventFromLLMGenUiZod } from "./types";
import { getUiPrompt } from "../../prompts/getUI";

export const getUI = tool({
  description: getUiPrompt,
  parameters: z.object({
    message: z.string().describe(`Pass the message to this tool as clear order,
         what exactly it has to be done in order to achieve given goal`),
    shortMessage: z
      .string()
      .describe(
        `Short message of what what user requested and what you can do for him. Be serious and kinda cool.`
      ),
    listOfActionToDo: z
      .array(eventFromLLMGenUiZod)
      .describe(`Array of items, tasks, events to insert or change.`),
  }),
  execute: async ({ message, listOfActionToDo }) => {
    return { message, listOfActionToDo };
  },
});
