import { ChevronRight, MessageSquare } from "lucide-react"

import { Card } from "@/components/ui/card"

export const SharedContext = () => {
  return (
    <Card className="flex items-center gap-4 p-4 bg-green-50/50">
      <div className="flex-shrink-0">
        <MessageSquare size={32} className="text-green-600" />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium">Thread context</h3>
        <p className="text-sm text-muted-foreground">
          Shared context for this thread
        </p>
      </div>

      <ChevronRight className="flex-shrink-0 text-muted-foreground" />
    </Card>
  )
}
