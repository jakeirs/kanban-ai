import type { z } from "zod";
import { calendarToolSchemaZod } from "./types";
import { tool } from "ai";

export const calendarEventTool = tool({
  description: `Tool do zarządzania wydarzeniami w kalendarzu. Używaj tego narzędzia gdy:
    1. Użytkownik chce dodać nowe wydarzenie/wydarzenia do kalendarza
    2. Użytkownik chce zobaczyć proponowane zmiany w kalendarzu
    3. Użytkownik prosi o zaplanowanie spotkania lub serii spotkań
    4. Potrzebujesz pokazać użytkownikowi proponowane terminy wydarzeń

    NIE używaj tego narzędzia gdy:
    1. Użytkownik tylko potwierdza lub odrzuca propozycję (użyj confirmation_tool)
    2. Potrzebujesz zadać ogólne pytanie (użyj general_tool)
    
    Przykłady użycia:
    1. "Dodaj spotkanie na jutro o 15:00" -> calendarEventTool
    2. "Zaplanuj 3 spotkania w tym tygodniu" -> calendarEventTool
    3. "Stwórz wydarzenie na przyszły piątek" -> calendarEventTool
    
    Zawsze ustaw requiresConfirmation: true jeśli:
    - Dodajesz nowe wydarzenie
    - Modyfikujesz istniejące wydarzenie
    - Proponujesz serię wydarzeń`,
  parameters: calendarToolSchemaZod,
  execute: async (input) => {
    const validatedInput = calendarToolSchemaZod.parse(input);

    console.log("validatedInput", JSON.stringify(validatedInput, null, 2));
    console.log("input", JSON.stringify(input, null, 2));
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
