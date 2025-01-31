import { z } from "zod";

// Simple and focused schema for confirmation
export const generalToolParamsZod = z.object({
  messageToUser: z
    .string()
    .describe("Message to user, responding shortly his request"),
});
