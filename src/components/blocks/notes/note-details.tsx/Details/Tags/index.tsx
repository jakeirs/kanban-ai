import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface TagWithIconProps {
  icon: LucideIcon
  label: string
  className?: string
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function TagWithIcon({ icon: Icon, label, className, variant = "secondary" }: TagWithIconProps) {
  return (
    <Badge 
      variant={variant}
      className={cn(
        "gap-1 px-3 py-1 bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground",
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  )
}
