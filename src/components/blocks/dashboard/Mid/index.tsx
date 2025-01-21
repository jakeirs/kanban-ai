"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Video, CircleDot } from "lucide-react"
import Link from "next/link"
import { ActiveSessionItem } from "./Projects"

export interface MidProps {
  activeSessions: {
    title: string
    duration: string
    type: "video" | "info"
  }[]
}

const Mid: React.FC<MidProps> = ({ activeSessions }) => (
  <Card className="bg-black text-white rounded-3xl">
    <CardContent className="p-0">
      {activeSessions.map((session, index) => (
        <React.Fragment key={index}>
          <Link href="/mobile/project">
            <ActiveSessionItem
              title={session.title}
              duration={session.duration}
              icon={
                session.type === "video" ? (
                  <Video className="w-5 h-5" />
                ) : (
                  <CircleDot className="w-5 h-5" />
                )
              }
              onClick={() =>
                console.log(`Navigating to session: ${session.title}`)
              }
            />
            {index < activeSessions.length - 1 && (
              <div className="px-4">
                <Separator className="bg-gray-800" />
              </div>
            )}
          </Link>
        </React.Fragment>
      ))}
    </CardContent>
  </Card>
)

export default Mid
