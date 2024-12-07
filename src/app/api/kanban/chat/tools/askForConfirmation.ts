import { tool } from "ai";
import { z } from "zod";

export const askForConfirmation = tool({
  description: "Ask the user for confirmation before making changes to the board",
  parameters: z.object({
    message: z.string().describe("The message to ask for confirmation"),
    action: z.string().describe("The action being confirmed"),
  }),
});
