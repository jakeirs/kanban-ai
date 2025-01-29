import { cn } from "@/lib/utils"

interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="w-2 h-2 rounded-full bg-foreground/70 animate-loader" />
      <div className="w-2 h-2 rounded-full bg-foreground/70 animate-loader [animation-delay:0.2s]" />
      <div className="w-2 h-2 rounded-full bg-foreground/70 animate-loader [animation-delay:0.4s]" />
    </div>
  )
}
