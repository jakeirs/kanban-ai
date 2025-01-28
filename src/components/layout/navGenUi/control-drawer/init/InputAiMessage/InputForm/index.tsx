import { Button } from "@/components/ui/button"
import { VoiceRecorder } from "@/components/blocks/voice-recorder"
import { FormEvent, ChangeEvent } from "react"

interface InputFormProps {
  inputMode: "voice" | "keyboard"
  input: string
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  onRecordingComplete: (blob: Blob) => Promise<void>
}

export const InputForm: React.FC<InputFormProps> = ({
  inputMode,
  input,
  handleInputChange,
  handleSubmit,
  onRecordingComplete,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {inputMode === "voice" ? (
        <div className="text-center space-y-6">
          <p className="text-gray-500 text-lg">
            Tap the mic button to start speaking
          </p>
          <VoiceRecorder onRecordingComplete={onRecordingComplete} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            className="w-full h-32 p-3 border rounded-lg mb-2"
            placeholder="Type your message here..."
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      )}
    </div>
  )
}
