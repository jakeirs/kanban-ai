"use client"

import React from "react"
import { SheetTitle } from "@/components/ui/sheet"

export const Vizualizer = () => {
  return (
    <div className="mt-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <SheetTitle className="text-3xl">Processing Your Input</SheetTitle>
        </div>
        
        <div className="flex flex-col items-center space-y-8">
          <div className="w-full max-w-md bg-muted p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analyzing Input</span>
                <span className="text-sm text-muted-foreground">100%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full w-full bg-primary rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Processing Content</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full w-3/4 bg-primary rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Generating Response</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full w-1/2 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground">
            Processing your input and generating an intelligent response...
          </p>
        </div>
      </div>
    </div>
  )
}
