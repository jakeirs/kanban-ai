"use client"

import React from "react"
import { ChevronRight } from "lucide-react"

interface ProjectTileProps {
  title: string
  duration: string
  icon: React.ReactNode
  onClick?: () => void
}

export const ProjectTile: React.FC<ProjectTileProps> = ({
  title,
  duration,
  icon,
  onClick,
}) => (
  <div
    className="cursor-pointer hover:rounded-3xl rounded-3xl hover:bg-gray-900 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-400">Starting: since {duration}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  </div>
)
