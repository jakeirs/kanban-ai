import { tool } from "ai";
import { calendarSearchToolArgsZod } from "./typesOldWithMatches";
import type { ToolResponse } from "../types";
import {
  calendarManageToolDescription,
  calendarSearchToolDescription,
} from "./description";
import { calendarSearchToolArgsZodWith } from "./types";

export const calendarSearchTool = tool({
  description: calendarManageToolDescription,
  parameters: calendarSearchToolArgsZodWith,
  execute: async (input, { messages }) => {
    console.log("messages in Tools", JSON.stringify(messages, null, 2));
    console.log("input in Tools", JSON.stringify(input, null, 2));

    try {
      const response: ToolResponse = {
        success: true,
        nextAction: {
          waitForUserResponse: false,
          actImmediatelly: true,
          nextToolToUse: "none",
        },
        context: {
          data: input,
        },
      };

      return response;
    } catch (error) {
      // Obsługa błędów
      const errorResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        nextAction: {
          waitForUserResponse: true,
          actImmediatelly: false,
          nextToolToUse: "GeneralTool",
        },
        message: `
        Wystąpił błąd podczas przetwarzania żądania: ${error}
        Poproś użytkownika o poprawienie danych lub podanie dodatkowych informacji.
    `,
      };

      return errorResponse;
    }
  },
});
