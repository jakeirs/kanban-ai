import { cn } from "@/lib/utils"

interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-3 h-3 rounded-full bg-blue-500 animate-loader" />
      <div className="w-3 h-3 rounded-full bg-purple-500 animate-loader [animation-delay:0.2s]" />
      <div className="w-3 h-3 rounded-full bg-pink-500 animate-loader [animation-delay:0.4s]" />
    </div>
  )
}
