"use client"

import { Message } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { VoiceRecorder } from "@/components/blocks/voice-recorder"
import { useKanbanAiChat } from "./useKanbanAiChat"
import { Mic, PenLine } from "lucide-react"

export const KanbanAIDrawer = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    inputMode,
    toggleInputMode,
    onRecordingComplete,
  } = useKanbanAiChat()

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

            {/* Mode Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={toggleInputMode}
            >
              {inputMode === "write" ? (
                <Mic className="w-6 h-6" />
              ) : (
                <PenLine className="w-6 h-6" />
              )}
            </Button>

            {/* Input Section */}
            {inputMode === "write" ? (
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
            ) : (
              <VoiceRecorder onRecordingComplete={onRecordingComplete} />
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default KanbanAIDrawer
