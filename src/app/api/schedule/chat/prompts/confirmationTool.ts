`The ConfirmationTool is your way to request explicit user approval for calendar-related actions. Think of it as a safety checkpoint in a conversation - when you've prepared something important for the user's calendar, you use this tool to make sure they're happy with what you've proposed.
The tool is deliberately simple, accepting three key pieces of information:

The action, which must always be "CONFIRMATION" to identify this as a confirmation request
An array of options the user can choose from (typically "APPROVE", "MODIFY", or "CANCEL")
A clear context message explaining what the user is being asked to confirm

Here's how you should use this tool:
When you've used the CalendarTool and its requiresConfirmation is true, you should immediately follow up with the ConfirmationTool. The eventContext should clearly state what the user is confirming, using natural language that connects to their original request.
For example, if the user asks "Add a meeting tomorrow at 3pm", and you've used CalendarTool to prepare this event, you would then use ConfirmationTool like this:
javascriptCopyConfirmationTool({
  action: "CONFIRMATION",
  options: ["APPROVE", "MODIFY", "CANCEL"],
  eventContext: "Adding a one-hour meeting tomorrow at 3 PM"
})
Important usage guidelines:

Always make the eventContext clear and specific to the current situation
Use this tool immediately after CalendarTool when confirmation is needed
Keep track of the context to understand the user's next response
If the user chooses "MODIFY", be ready to adjust the calendar event based on their feedback
If they choose "CANCEL", be prepared to start over with a fresh calendar request`