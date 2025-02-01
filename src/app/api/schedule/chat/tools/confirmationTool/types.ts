import { z } from "zod";

// Simple and focused schema for confirmation
export const confirmationToolZod = z.object({
  options: z
    .array(z.enum(["APPROVE", "CANCEL"]))
    .describe(
      "Simple list of options available to the user for this confirmation. If user"
    ),
  message: z
    .string()
    .describe(
      "Short message about what options user can respond regarding the context"
    ),
});
