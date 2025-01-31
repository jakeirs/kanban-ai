import { afterConfirmationToolZod } from "./types";
import { tool } from "ai";

export const afterConfirmationTool = tool({
  description: ` afterConfirmationTool Definition
  
 Purpose: This tool should be use immediately after user confrim changes in result from confirmationTool
 If userSelectedOption is set to "APPROVE", then it means you need to use this tool. To apply changes
 that user requested and approved.
 This tool will return what you need to do next and how inform user about
 `,
  parameters: afterConfirmationToolZod,
  execute: async (input) => {
    const validatedInput = afterConfirmationToolZod.parse(input);

    console.log(
      "afterConfirmationToolZod input",
      JSON.stringify(validatedInput, null, 2)
    );

    return {
      whatToDoNext: {
        action:
          "Request is proceeding...we will notify when events will be added successfully Ask user what he want to do next",
        nextToolToUsage: "GeneralTool",
      },
    };
  },
});
