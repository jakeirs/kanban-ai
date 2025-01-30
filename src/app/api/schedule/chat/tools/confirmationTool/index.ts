import { confirmationToolZod } from "./types";
import { tool } from "ai";

export const confirmationTool = tool({
  description: ` ConfirmationTool Definition
  
 Purpose: This tool allows the AI to request explicit user confirmation for calendar actions.
 It creates an interactive moment in the conversation where users can approve, modify,
 or cancel proposed actions.`,
  parameters: confirmationToolZod,
  execute: async (input) => {
    const validatedInput = confirmationToolZod.parse(input);
    console.log(
      "confirmationTool ZIOM",
      JSON.stringify(validatedInput, null, 2)
    );

    return {
      aiContext: {
        type: "AWAITING_USER_CONFIRMATION",
        about: validatedInput.eventContext,
        possibleResponses: ["APPROVE", "MODIFY", "CANCEL"],
      },
      display: {
        type: "CONFIRMATION_BUTTONS",
        message: validatedInput.eventContext,
        options: ["APPROVE", "MODIFY", "CANCEL"],
      },
    };
  },
});
