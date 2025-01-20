"use client"

import React from "react"
import { SheetTitle } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Target, GitBranch, Clock, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

import { ProcessingVisualizerProps, exampleProcessingProps } from "./props"

const ProcessingVisualizer: React.FC<ProcessingVisualizerProps> = ({
  keywords,
  connections,
  isProcessing,
}) => {
  const [processedKeywords, setProcessedKeywords] = React.useState<string[]>(
    []
  )
  const [processedConnections, setProcessedConnections] = React.useState<
    number[]
  >([])
  const [showConnections, setShowConnections] = React.useState(false)

  React.useEffect(() => {
    if (isProcessing) {
      setProcessedKeywords(keywords)
      setShowConnections(false)

      // Start showing connections after keywords animation (0.2s delay + 0.1s per keyword)
      const keywordsAnimationDuration = 200 + keywords.length * 100
      setTimeout(() => {
        setProcessedConnections(
          Array.from({ length: connections.length }, (_, i) => i)
        )
        setShowConnections(true)
      }, keywordsAnimationDuration)
    } else {
      setProcessedKeywords([])
      setProcessedConnections([])
      setShowConnections(false)
    }
  }, [isProcessing, keywords, connections])

  const keywordsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  }

  const keywordVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: custom * 0.1,
      },
    }),
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  }

  const connectionsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  }

  const connectionVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: custom * 0.15,
      },
    }),
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className="mt-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <SheetTitle className="text-3xl">Processing Your Input</SheetTitle>
        </div>
        
        <Card className="bg-slate-50 border-none">
          <CardContent className="p-6 space-y-6">
            <AnimatePresence mode="wait">
              {isProcessing && (
                <>
                  {/* Keywords Section */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-500 mb-3">
                      Identified Concepts
                    </h3>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={keywordsContainerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {processedKeywords.map((keyword, index) => (
                        <motion.div
                          key={keyword}
                          custom={index}
                          variants={keywordVariants}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-white shadow-sm text-slate-600 px-3 py-1"
                          >
                            {keyword}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Connections Section */}
                  <ScrollArea className="h-[200px] rounded-md border border-slate-100 bg-white p-4">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-slate-500 mb-4">
                        Discovered Connections
                      </h3>

                      <motion.div
                        className="space-y-2"
                        variants={connectionsContainerVariants}
                        initial="hidden"
                        animate={showConnections ? "visible" : "hidden"}
                        exit="exit"
                      >
                        {processedConnections.map((index) => {
                          const connection = connections[index]
                          return (
                            <motion.div
                              key={`${connection.category}-${index}`}
                              custom={index}
                              variants={connectionVariants}
                              className="flex items-center space-x-3"
                            >
                              {/* Category Icon */}
                              <div
                                className={cn(
                                  "p-2 rounded-md",
                                  connection.category === "goal" && "bg-green-50",
                                  connection.category === "stream" && "bg-blue-50",
                                  connection.category === "task" && "bg-purple-50",
                                  connection.category === "resource" &&
                                    "bg-amber-50"
                                )}
                              >
                                {connection.category === "goal" && (
                                  <Target className="h-4 w-4 text-green-600" />
                                )}
                                {connection.category === "stream" && (
                                  <GitBranch className="h-4 w-4 text-blue-600" />
                                )}
                                {connection.category === "task" && (
                                  <Clock className="h-4 w-4 text-purple-600" />
                                )}
                                {connection.category === "resource" && (
                                  <Calendar className="h-4 w-4 text-amber-600" />
                                )}
                              </div>

                              {/* Connection Type */}
                              <span className="text-sm font-medium text-slate-600">
                                {connection.type}
                              </span>

                              <ArrowRight className="h-4 w-4 text-slate-300" />

                              {/* Target */}
                              <span className="text-sm text-slate-600">
                                {connection.target}
                              </span>
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    </div>
                  </ScrollArea>

                  {/* Processing Status */}
                  {processedConnections.length < connections.length && (
                    <motion.div
                      className="flex justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="text-sm text-slate-500">Processing...</span>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const Vizualizer = () => {
  return <ProcessingVisualizer {...exampleProcessingProps} />
}
