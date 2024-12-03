"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface Message {
  id: string;
  type: "human" | "ai" | "tool";
  content: string | any;
  tool_calls?: any[];
  name?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: "human", content: input },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      console.log("data", data);
      setMessages((prev) => [...prev, ...data.messages]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "ai",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    }

    setIsLoading(false);
  };

  const renderMessage = (message: Message) => {
    switch (message.type) {
      case "human":
        return (
          <div className="bg-primary text-primary-foreground ml-auto max-w-[80%] p-4 rounded-lg">
            {message.content}
          </div>
        );
      case "ai":
        return (
          <div className="space-y-2 max-w-[80%]">
            <div className="bg-muted p-4 rounded-lg">
              {typeof message.content === "string"
                ? message.content
                : message.content.map((part: any, idx: number) => (
                    <div key={idx}>
                      {part.type === "text" && <p>{part.text}</p>}
                      {part.type === "tool_use" && (
                        <div className="text-sm text-muted-foreground mt-1">
                          Using tool: {part.name}
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          </div>
        );
      case "tool":
        return (
          <div className="bg-green-300 text-accent-foreground max-w-[80%] p-4 rounded-lg">
            <div className="text-sm font-medium mb-1">
              Tool Response: {message.name}
            </div>
            <div>
              {typeof message.content === "string"
                ? message.content
                : JSON.stringify(message.content, null, 2)}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id}>{renderMessage(message)}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
