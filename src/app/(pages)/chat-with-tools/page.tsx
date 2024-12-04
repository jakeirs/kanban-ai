"use client";

import { Message, useChat } from "ai/react";
import { ToolInvocation } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatWithTools() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat({
      maxSteps: 2,
      api: "/api/chat-with-tools",
      // Handle client-side tools that are automatically executed
      async onToolCall({ toolCall }) {
        if (toolCall.toolName === "getLocation") {
          const cities = [
            "New York",
            "Los Angeles",
            "Chicago",
            "San Francisco",
            "Miami",
            "Seattle",
          ];
          return cities[Math.floor(Math.random() * cities.length)];
        }
      },
    });

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages?.map((m: Message) => (
          <div
            key={m.id}
            className={`p-4 rounded-lg ${
              m.role === "assistant" ? "bg-gray-100 ml-4" : "bg-blue-100 mr-4"
            }`}
          >
            <div className="font-semibold mb-2 text-sm text-gray-600">
              {/* ROLE */}
              {m.role.charAt(0).toUpperCase() + m.role.slice(1)}
            </div>
            <div className="text-gray-800">{m.content}</div>

            {/* Tool Invocations */}
            {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
              const toolCallId = toolInvocation.toolCallId;
              const addResult = (result: string) =>
                addToolResult({ toolCallId, result });
              // Render confirmation tool (client-side tool with user interaction BUTTON)
              if (toolInvocation.toolName === "askForConfirmation") {
                return (
                  <div
                    key={toolCallId}
                    className="mt-2 p-3 bg-white rounded border border-gray-200"
                  >
                    <p className="text-gray-700 mb-2">
                      {toolInvocation.args?.message}
                    </p>
                    <div className="flex gap-2">
                      {"result" in toolInvocation ? (
                        <span className="font-medium text-gray-900">
                          {toolInvocation.result}
                        </span>
                      ) : (
                        <>
                          {/** BUTTON */}
                          <Button
                            onClick={() => addResult("Yes")}
                            variant="default"
                            size="sm"
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={() => addResult("No")}
                            variant="outline"
                            size="sm"
                          >
                            No
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              }

              // Render other tools
              return (
                <div
                  key={toolCallId}
                  className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600"
                >
                  {"result" in toolInvocation ? (
                    <>
                      <span className="font-medium">
                        {toolInvocation.toolName}
                      </span>{" "}
                      {toolInvocation.result}
                    </>
                  ) : (
                    <span className="italic">
                      Calling {toolInvocation.toolName}...
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Chat Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 sticky bottom-4 bg-white p-2 rounded-lg shadow"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
