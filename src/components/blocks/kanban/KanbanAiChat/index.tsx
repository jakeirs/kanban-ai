"use client";

import { Message, useChat } from "ai/react";
import { generateId } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { VoiceRecorder } from "@/components/blocks/voice-recorder";

export const KanbanAIDrawer = () => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/kanban/chat",
    });

  const onRecordingComplete = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    try {
      const response = await fetch("/api/whisper", {
        method: "POST",
        body: formData,
      });

      const transcript = await response.json();

      setMessages((currentMessages: Message[]) => [
        ...currentMessages,
        {
          id: generateId(),
          content: transcript.text,
          role: "user",
        },
      ]);
    } catch (error) {
      console.error("Failed to send recording to API:", error);
    }
  };
  console.log("messages", messages);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 left-4">
          Open AI Assistant
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Kanban AI Assistant</DrawerTitle>
          <DrawerDescription>
            Chat with AI about your Kanban board
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <div className="flex flex-col h-[500px]">
            {/* Messages Container */}
            <div className="flex-1 mb-4 space-y-4 overflow-y-auto">
              {messages?.map((m: Message) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-lg ${
                    m.role === "assistant"
                      ? "bg-gray-100 ml-4"
                      : "bg-blue-100 mr-4"
                  }`}
                >
                  <div className="mb-2 text-sm font-semibold text-gray-600">
                    {m.role.charAt(0).toUpperCase() + m.role.slice(1)}
                  </div>
                  <div className="text-gray-800">{m.content}</div>
                </div>
              ))}
            </div>
            <VoiceRecorder onRecordingComplete={onRecordingComplete} />

            {/* Chat Input Form */}
            <form
              onSubmit={handleSubmit}
              className="sticky bottom-0 flex gap-2 p-2 bg-white rounded-lg shadow"
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about your Kanban board..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default KanbanAIDrawer;
