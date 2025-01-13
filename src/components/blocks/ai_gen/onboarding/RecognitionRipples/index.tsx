"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plane,
  CalendarCheck,
  AlertTriangle,
  Clock,
  Map,
  Utensils,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { vietnamTripRecognition } from "./props";

interface RecognitionDisplayProps {
  data: typeof vietnamTripRecognition;
}

const RecognitionDisplay: React.FC<RecognitionDisplayProps> = ({ data }) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    const icons = {
      location: <Map className="h-4 w-4" />,
      activity: <Utensils className="h-4 w-4" />,
      logistics: <Plane className="h-4 w-4" />,
      preparation: <ShieldCheck className="h-4 w-4" />,
      concern: <AlertTriangle className="h-4 w-4" />,
    };
    return icons[category] || <Info className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800",
      needs_clarification: "bg-yellow-100 text-yellow-800",
      suggested: "bg-blue-100 text-blue-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Core Context Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Vietnam Adventure</CardTitle>
            <Badge variant="secondary" className="text-sm">
              {data.processingConfidence * 100}% Confidence
            </Badge>
          </div>
          <CardDescription className="text-base">
            {data.coreContext.mainGoal}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{data.coreContext.duration}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <CalendarCheck className="h-3 w-3" />
              <span>{data.coreContext.timeframe}</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recognized Elements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.recognizedElements.map((element) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(element.category)}
                    <CardTitle className="text-base">
                      {element.content}
                    </CardTitle>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Details & Insights</SheetTitle>
                        <SheetDescription>
                          Additional information and AI suggestions
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        {/* Element Details */}
                        <div className="space-y-2">
                          <h4 className="font-medium">Status</h4>
                          <Badge className={getStatusColor(element.status)}>
                            {element.status.replace("_", " ")}
                          </Badge>
                        </div>

                        {/* AI Insights */}
                        <div className="space-y-2">
                          <h4 className="font-medium">AI Insights</h4>
                          <ScrollArea className="h-[200px] rounded-md border p-4">
                            {element.aiInsights.map((insight, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-2 mb-3"
                              >
                                <div
                                  className={`p-2 rounded-full 
                                  ${
                                    insight.type === "warning"
                                      ? "bg-red-100"
                                      : insight.type === "tip"
                                        ? "bg-green-100"
                                        : insight.type === "suggestion"
                                          ? "bg-blue-100"
                                          : "bg-yellow-100"
                                  }`}
                                >
                                  {insight.type === "warning" ? (
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                  ) : insight.type === "tip" ? (
                                    <Info className="h-4 w-4 text-green-500" />
                                  ) : insight.type === "suggestion" ? (
                                    <Utensils className="h-4 w-4 text-blue-500" />
                                  ) : (
                                    <HelpCircle className="h-4 w-4 text-yellow-500" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-700">
                                    {insight.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </ScrollArea>
                        </div>

                        {/* Metadata */}
                        {element.metadata && (
                          <div className="space-y-2">
                            <h4 className="font-medium">
                              Additional Information
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(element.metadata).map(
                                ([key, value]) =>
                                  value && (
                                    <div
                                      key={key}
                                      className="bg-gray-50 p-2 rounded"
                                    >
                                      <div className="text-xs text-gray-500">
                                        {key}
                                      </div>
                                      <div className="text-sm">{value}</div>
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {element.metadata?.timeRelevance && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="text-xs">
                            {element.metadata.timeRelevance}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          When this needs attention
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {element.metadata?.estimatedCost && (
                    <Badge variant="secondary" className="text-xs">
                      {element.metadata.estimatedCost}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Missing Information Alert */}
      {data.missingCriticalInformation.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Additional Information Needed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.missingCriticalInformation.map((item) => (
                <li key={item.id} className="flex items-start space-x-2">
                  <HelpCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <span className="font-medium">{item.aspect}:</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {item.impact}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecognitionDisplay;
