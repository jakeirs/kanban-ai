import type { ToolResponse } from "../types";
import { generalToolParamsZod } from "./types";
import { tool } from "ai";

export const generalTool = tool({
  description: `GeneralTool Definition

 Purpose: This tool should be use, when other tools can't be used.
 when user ask something out of scope or there is an error to display to user.
 
 When user want to just talk with you in regular conversation with you.
 `,
  parameters: generalToolParamsZod,
  execute: async (input) => {
    const validatedInput = generalToolParamsZod.parse(input);

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
