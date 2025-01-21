import { StickyNote } from "lucide-react"
import { cn } from "@/lib/utils"

interface SmallNotesProps {
  notes: {
    id: string
    title: string
  }[]
  className?: string
}

export const SmallNotes = ({ notes, className }: SmallNotesProps) => {
  const visibleNotes = notes.slice(0, 5)
  const remainingCount = notes.length - 5

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {visibleNotes.map((note) => (
        <div
          key={note.id}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary"
        >
          <StickyNote className="w-4 h-4 text-secondary-foreground" />
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
          <span className="text-xs font-medium text-primary-foreground">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  )
}
