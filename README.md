# My repository:

- shadcn-ui
- file structures
  ```
  - app|
       |-(pages)/
       |-api/
  - components/
  - lib/
  - style/
  ```

## Running the Application

To run the application properly, use the following commands:

```bash
# Start the frontend (Next.js)
npm run dev:frontend

# Start the backend (Convex)
npm run dev:backend
```

Note: Do not use "npm run dev" unless you have properly configured Convex first.

## Project Structure Overview

### LangGraph Implementation (/src/app/(pages)/langgraph-agent)
This section contains the LangGraph implementation with one tool connected:
- getCurrentTime: A tool that provides the current time functionality
- Demonstrates basic LangGraph setup and tool integration

### AI SDK Implementation (/src/app/(pages)/chat-with-tools)
This section showcases the implementation of Vercel's AI SDK (version 4.0.11) with three connected tools:
- Utilizes the latest AI SDK Core and UI components
- Uses `useChat` hook from `"ai"` package for chat functionality
- API Route: Hits `/api/chat-with-tools` for processing requests
- Features three integrated tools for enhanced chat functionality
- Built using the modern AI SDK patterns and practices

### Operations Section (/src/app/(pages)/operations)
This section contains client-side operations with two integrated tools:
- Features client-side tool invocation
- Includes chat drawer functionality
- Contains manual edit panel implementation
- Tools are directly invoked from the client side for immediate interaction
- API Route: Hits `/api/operations` for processing chat operations
- Uses `useChat` hook from `"ai"` package for chat interactions

