import { tool } from "ai";
import { z } from "zod";

import { eventGenUiZod } from "./types";

export const getUI = tool({
  description: `Use this tools to always first before using anyother tool.
   This tool is important, because it's to show user information in nice way.  
   For example: if user request to add 5 new events to his calendar, you should use this tool first,
   in order to inform user about it.
   Next you will need to use other tool "updateSchedule" to actually update Schedule / Calendar
   in database.
   Remember about this:
   This tool is to inform user. Use it always first. 
  `,
  parameters: z.object({
    message: z.string().describe(`Pass the message to this tool as clear order,
         what exactly it has to be done in order to achieve given goal`),
    shortMessage: z
      .string()
      .describe(
        `Short message of what what user requested and what you can do for him. Be serious and kinda cool.`
      ),
    listOfActionToDo: z
      .array(eventGenUiZod)
      .describe(`Array of items, tasks, events to insert or change.`),
  }),
  execute: async ({ message, listOfActionToDo }) => {
    return { message, listOfActionToDo };
  },
});
