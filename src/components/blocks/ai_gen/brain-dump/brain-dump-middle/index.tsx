"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  Mic, 
  PenTool, 
  Type, 
  Wand2,
  Sparkles,
  MessageSquare,
  Target,
  Activity
} from 'lucide-react';

// First, let's implement our input method components
const TextInput: React.FC<{ onInput: (text: string) => void }> = ({ onInput }) => {
  return (
    <div className="space-y-4">
      <Textarea 
        placeholder="What's on your mind?"
        className="min-h-[150px] text-lg"
        onChange={(e) => onInput(e.target.value)}
      />
    </div>
  );
};

const VoiceInput: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center h-[200px] space-y-4">
      <Button 
        size="lg" 
        variant={isRecording ? "destructive" : "default"}
        className="rounded-full h-16 w-16"
        onClick={() => setIsRecording(!isRecording)}
      >
        <Mic className={cn(
          "h-8 w-8",
          isRecording && "animate-pulse"
        )} />
      </Button>
      <span className="text-sm text-muted-foreground">
        {isRecording ? "Recording..." : "Click to start recording"}
      </span>
    </div>
  );
};

// Now, let's create our processing visualization component
const ProcessingVisualizer: React.FC<{ 
  keywords: string[], 
  connections: Array<{ type: string, target: string }> 
}> = ({ keywords, connections }) => {
  return (
    <div className="relative h-[200px] overflow-hidden bg-muted/30 rounded-lg">
      {/* Keywords float up with different speeds */}
      {keywords.map((word, index) => (
        <div
          key={word}
          className="absolute animate-float-up text-sm px-2 py-1 bg-background/80 rounded"
          style={{
            left: `${(index * 20) % 80}%`,
            animationDelay: `${index * 0.2}s`
          }}
        >
          {word}
        </div>
      ))}
      
      {/* Connection threads */}
      {connections.map((connection, index) => (
        <div
          key={index}
          className="absolute h-px bg-gradient-to-r from-purple-500 to-transparent animate-extend"
          style={{
            width: '100px',
            transform: `rotate(${index * 45}deg)`,
            animationDelay: `${index * 0.3}s`
          }}
        />
      ))}
    </div>
  );
};

// Our main Brain Dump modal component
const BrainDumpModal: React.FC<{ 
  isOpen: boolean, 
  onOpenChange: (open: boolean) => void 
}> = ({ isOpen, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState('text');
  const [inputContent, setInputContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleInput = (content: string) => {
    setInputContent(content);
    // Simulate processing after brief delay
    if (content.length > 10) {
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 3000);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Capture Your Thoughts</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Context Banner */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Target className="h-5 w-5 text-purple-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Current Focus</p>
                  <p className="text-sm text-muted-foreground">Project Setup Phase</p>
                </div>
                <Activity className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Input Methods */}
          <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="text">
                <Type className="h-4 w-4 mr-2" />
                Text
              </TabsTrigger>
              <TabsTrigger value="voice">
                <Mic className="h-4 w-4 mr-2" />
                Voice
              </TabsTrigger>
              <TabsTrigger value="draw">
                <PenTool className="h-4 w-4 mr-2" />
                Draw
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="text">
                <TextInput onInput={handleInput} />
              </TabsContent>
              <TabsContent value="voice">
                <VoiceInput />
              </TabsContent>
              <TabsContent value="draw">
                <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Drawing canvas coming soon</span>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* Processing Visualization */}
          {isProcessing && (
            <ProcessingVisualizer 
              keywords={['project', 'setup', 'timeline', 'goals']}
              connections={[
                { type: 'goal', target: 'Project Setup' },
                { type: 'stream', target: 'Planning' },
                { type: 'task', target: 'Documentation' }
              ]}
            />
          )}

          {/* Quick Actions */}
          <div className="flex justify-between px-2">
            <Button variant="ghost" size="sm">
              <Wand2 className="h-4 w-4 mr-2" />
              Process
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Clarify
            </Button>
            <Button variant="ghost" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Enhance
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Updated Brain Dump FAB to include modal
const BrainDumpMiddle: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-purple-500 hover:bg-purple-600 shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <Brain className="h-6 w-6" />
      </Button>

      <BrainDumpModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default BrainDumpMiddle;