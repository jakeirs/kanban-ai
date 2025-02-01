export const calendarToolDescription = `
      Calendar Tool Description
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
      Proposing a series of events`;
