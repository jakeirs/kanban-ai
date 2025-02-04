import { tool } from "ai";
import { calendarSearchToolArgsZod } from "./types";
import type { ToolResponse } from "../types";
import { calendarSearchToolDescription } from "./description";

export const calendarSearchTool = tool({
  description: calendarSearchToolDescription,
  parameters: calendarSearchToolArgsZod,
  execute: async (input) => {
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
