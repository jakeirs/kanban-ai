import type { ToolResponse } from "../types";
import { confirmationToolDescription } from "./description";
import { confirmationToolZod } from "./types";
import { tool } from "ai";

export const confirmationTool = tool({
  description: confirmationToolDescription,
  parameters: confirmationToolZod,
  execute: async (input) => {
    
    const response: ToolResponse = {
      success: true,
      nextAction: {
        waitForUserResponse: true,
        actImmediatelly: false,
      },
    };

    return response;
  },
});
