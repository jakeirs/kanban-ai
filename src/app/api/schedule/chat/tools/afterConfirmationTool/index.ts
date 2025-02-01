import type { ToolResponse } from "../types";
import { afterConfirmationToolDescription } from "./description";
import { afterConfirmationToolZod } from "./types";
import { tool } from "ai";

export const afterConfirmationTool = tool({
  description: afterConfirmationToolDescription,
  parameters: afterConfirmationToolZod,
  execute: async (input) => {
    
    const response: ToolResponse = {
      success: true,
      nextAction: {
        waitForUserResponse: false,
        actImmediatelly: true,
        nextToolToUse: "GeneralTool",
      },
    };

    return response;
  },
});
