"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BodyProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function Body({ children, onClick, className }: BodyProps) {
  return (
    <Card
      className={cn(
        "w-full cursor-pointer bg-zinc-900 p-6 transition-colors rounded-t-3xl",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  )
}
