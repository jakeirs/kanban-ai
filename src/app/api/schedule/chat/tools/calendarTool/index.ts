import type { z } from "zod";
import { calendarToolSchemaZod } from "./types";
import { tool } from "ai";

export const calendarTool = tool({
  description: `Calendar Tool Description
      This tool is designed to manage calendar events. Use this tool when:

      A user wants to add new event(s) to the calendar
      A user wants to see proposed changes to the calendar
      A user requests to schedule a meeting or series of meetings
      You need to show the user proposed event times

      Do NOT use this tool when:

      A user is only confirming or rejecting a proposal (use confirmation_tool instead)
      You need to ask a general question (use general_tool instead)

      Usage Examples:

      "Add a meeting tomorrow at 3:00 PM" -> calendarEventTool
      "Schedule 3 meetings this week" -> calendarEventTool
      "Create an event for next Friday" -> calendarEventTool

      Important Note About Confirmation:
      Always set requiresConfirmation: true when:

      Adding a new event
      Modifying an existing event
      Proposing a series of events`,
  parameters: calendarToolSchemaZod,
  execute: async (input) => {
    const validatedInput = calendarToolSchemaZod.parse(input);

    console.log("input", JSON.stringify(input, null, 2));

    return {
      aiMessage: "Now request user for confirmation using confrimationTool",
      requiresConfirmation: true,
      eventsRequested: input.events,
    };
  },
});

// Funkcja wykonawcza
async function executeCalendarTools(
  input: z.infer<typeof calendarToolSchemaZod>
) {
  try {
    // 1. Walidacja danych wejściowych
    const validatedInput = calendarToolSchemaZod.parse(input);

    // 2. Sprawdzenie konfliktów w kalendarzu
    // const conflicts = await checkCalendarConflicts(validatedInput.events);

    // 3. Przygotowanie odpowiedzi
    const response = {
      success: true,
      data: validatedInput,
    };

    // 4. Informacja dla Agenta AI
    const aiMessage = `
      Przygotowałem wydarzenia zgodnie z prośbą użytkownika.
      ${
        validatedInput.requiresConfirmation
          ? "Użytkownik musi potwierdzić proponowane zmiany. Czekaj na jego odpowiedź i bądź gotowy na modyfikacje."
          : "Wydarzenia zostały dodane. Możesz zapytać użytkownika czy potrzebuje czegoś jeszcze."
      }
      Kontekst: ${validatedInput.shortMessage}
    `;

    return {
      response, // Odpowiedź dla frontendu
      aiMessage, // Informacja dla Agenta AI
    };
  } catch (error) {
    // Obsługa błędów
    const errorResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      nextAction: "Proszę poprawić dane i spróbować ponownie",
    };

    // Informacja dla Agenta AI o błędzie
    const aiMessage = `
      Wystąpił błąd podczas przetwarzania żądania: ${errorResponse.error}
      Poproś użytkownika o poprawienie danych lub podanie dodatkowych informacji.
    `;

    return {
      response: errorResponse,
      aiMessage,
    };
  }
}
