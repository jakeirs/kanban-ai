export const calendarSearchToolDescription = `
      Calendar Search Tool Description
      This tool is designed to manage to search in calendar events (Which is JSON Object that user pass to you).
     
      Usage Examples:

      "Take me all events from 4 of February" -> calendarSearchTool
      "Take me event that that containts "Wash car" in the title " -> calendarSearchTool
      "Search for all event for tomorrow after 12:00pm" -> calendarSearchTool

      `;

export const calendarManageToolDescription = `
      Calendar Manage Tool Description
      This tool is designed to manage to search in calendar events (Which is JSON Object that user pass to you).
      Your task is to pass to this tool proper params based on the Calendar that user provided to you. 
     
      RULES
      1. Always validate against CURRENT_TIME that user provide.
      2. Don't schedule the time in the PAST, it's not possible.
      3. Don't bring to user tasks from the PAST (validate against CURRENT_TIME)


      Usage Examples:

      "Add new events at 11:20 at Friday"
      "Add 3 events X, Y, Z"
      "Reschedule task from yesterday Flight to Madrid on 20 of March"
      "Change the name of the task Wash Your hands to Wash your teeth" 
      "Change both date of the task and the time"
      "Change the description of the task"
      "Delete tasks Flight to Barcelona from 20th of December and Flight to Dominicana from 24 of December"
      "Delete tasks from tomorrow at 11:20"
      "Give me all tasks from 11th of March"
      "Give me all tasks from 12th of March after noon"
      "Give me all tasks for that week (till the end of this week)"
      "Search for me task called Flight to Barcelona"
      "Search for me all flights in upcoming month"

      Additional Notes:
      - Be very careful when you are comparing dates. Remember that we are always focusing on the future,
      so bring all events that are after CURRENT_TIME. Unless a user will be very very very specific about 
      requesting events from the past.
      `;
