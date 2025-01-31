import { z } from "zod";

// Simple and focused schema for confirmation
export const confirmationToolZod = z.object({
  action: z
    .literal("CONFIRMATION")
    .describe("Identifies this as a confirmation request"),

  options: z
    .array(z.enum(["APPROVE", "MODIFY", "CANCEL"]))
    .describe(
      "Simple list of options available to the user for this confirmation"
    ),
  messageToUser: z.string().describe(
    `simple text, short explaining to user, that will appear before confirmation options. 
     Usually what appear before confirmation was the list of events. So don't mention about 
     details of those events. Just say:
      like. "Is that what you requested?" Or "What we do next?" "How you wanna proceed?" 
      `
  ),
  eventContext: z
    .string()
    .describe(
      "Simple text explaining what's will be confirmed, like 'Adding meeting for tomorrow at 3 PM'"
    ),
});
