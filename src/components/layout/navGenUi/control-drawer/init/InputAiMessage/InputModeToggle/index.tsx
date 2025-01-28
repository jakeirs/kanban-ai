import { Mic, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InputModeToggleProps {
  inputMode: "voice" | "keyboard"
  toggleInputMode: (mode: "voice" | "keyboard") => void
}

export const InputModeToggle: React.FC<InputModeToggleProps> = ({
  inputMode,
  toggleInputMode,
}) => {
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant={inputMode === "voice" ? "default" : "outline"}
        size="sm"
        onClick={() => toggleInputMode("voice")}
        className="w-32"
      >
        <Mic className="h-4 w-4 mr-2" />
        Voice
      </Button>
      <Button
        variant={inputMode === "keyboard" ? "default" : "outline"}
        size="sm"
        onClick={() => toggleInputMode("keyboard")}
        className="w-32"
      >
        <Keyboard className="h-4 w-4 mr-2" />
        Type
      </Button>
    </div>
  )
}
