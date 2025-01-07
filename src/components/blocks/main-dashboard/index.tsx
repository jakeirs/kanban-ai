"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Brain,
  Calendar,
  Clock,
  Heart,
  Settings,
  Zap,
  Target,
  Activity,
  Bell,
  Sparkles,
  BarChart,
  ArrowRight,
} from "lucide-react";

const FocusFlowDashboard = () => {
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  const [showTimeDrawer, setShowTimeDrawer] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto p-4 space-y-4">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500">Focus Mode</span>
              <Switch
                checked={focusModeEnabled}
                onCheckedChange={setFocusModeEnabled}
                className="data-[state=checked]:bg-purple-500"
              />
            </div>
            <Bell className="h-6 w-6 text-slate-600 cursor-pointer" />
          </div>
        </div>

        {/* Project Pulse Card */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-rose-500" />
                <CardTitle>Project Pulse</CardTitle>
              </div>
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Project Progress */}
              <div className="space-y-2">
                <span className="text-sm text-slate-600">Overall Progress</span>
                <Progress value={67} className="h-2" />
                <div className="flex justify-between text-sm text-slate-500">
                  <span>67%</span>
                  <span>Next milestone in 3 days</span>
                </div>
              </div>

              {/* Energy Level */}
              <div className="space-y-2">
                <span className="text-sm text-slate-600">Today's Energy</span>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <Zap key={i} className="h-5 w-5 text-yellow-500" />
                  ))}
                  {[4, 5].map((i) => (
                    <Zap key={i} className="h-5 w-5 text-slate-200" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Strip */}
        <div className="flex justify-between px-2 py-3 bg-white rounded-lg shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1"
          >
            <Brain className="h-5 w-5 text-purple-500" />
            <span className="text-xs">Brain Dump</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1"
          >
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="text-xs">Schedule</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1"
          >
            <Activity className="h-5 w-5 text-green-500" />
            <span className="text-xs">Streams</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1"
          >
            <Target className="h-5 w-5 text-rose-500" />
            <span className="text-xs">Goals</span>
          </Button>
        </div>

        {/* Active Streams Section */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Active Streams</CardTitle>
              <Button variant="ghost" size="sm">
                <BarChart className="h-4 w-4 mr-2" />
                Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Stream Progress Cards */}
              {["Development", "Marketing", "Content"].map((stream, index) => (
                <div key={stream} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{stream}</span>
                    <span className="text-slate-500">
                      {[60, 45, 30][index]}%
                    </span>
                  </div>
                  <Progress
                    value={[60, 45, 30][index]}
                    className="h-2"
                    style={{
                      background:
                        "linear-gradient(to right, rgb(219 234 254), rgb(191 219 254))",
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Management Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Clock className="h-4 w-4 mr-2" />
              Time Management
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh]">
            <SheetHeader>
              <SheetTitle>Time Overview</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-full py-4">
              {/* Time management content would go here */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Today's Schedule
                    </h3>
                    {/* Add schedule content */}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Quick Brain Dump FAB */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-purple-500 hover:bg-purple-600 shadow-lg"
      >
        <Brain className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default FocusFlowDashboard;
