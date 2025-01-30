import { z } from "zod";

// Simple and focused schema for confirmation
export const confirmationToolZod = z.object({
  action: z
    .literal("CONFIRMATION")
    .describe("Identifies this as a confirmation request"),

  options: z
    .array(z.enum(["APPROVE", "MODIFY", "CANCEL"]))
    .describe("Simple list of options available to the user for this confirmation"),

  eventContext: z
    .string()
    .describe("Simple text explaining what's will be confirmed, like 'Adding meeting for tomorrow at 3 PM'")
});

