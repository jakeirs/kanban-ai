import type { z } from "zod";
import { calendarToolSchemaZod } from "./types";
import { tool } from "ai";
import { calendarToolDescription } from "./description";
import type { ToolResponse } from "../types";

export const calendarTool = tool({
  description: calendarToolDescription,
  parameters: calendarToolSchemaZod,
  execute: async (input) => {
    try {
      const validatedInput = calendarToolSchemaZod.parse(input);

      const response: ToolResponse = {
        success: true,
        nextAction: {
          waitForUserResponse: false,
          actImmediatelly: true,
          nextToolToUse: "ConfirmationTool",
        },
        context: {
          data: validatedInput.events,
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
