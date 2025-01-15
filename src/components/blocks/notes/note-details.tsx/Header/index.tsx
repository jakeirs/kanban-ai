import { ChevronLeft, Clock, History, Notebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title: string;
  lastVisit: string;
  readingTime: string;
  onBack?: () => void;
}

export function Header({ title, lastVisit, readingTime, onBack }: HeaderProps) {
  return (
    <div className="relative w-full h-[300px] rounded-b-[30px] overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"
        style={{
          opacity: 0.95,
        }}
      />

      {/* Background Icon */}
      <div className="absolute right-[-50px] top-[50%] translate-y-[-50%] opacity-10">
        <Notebook className="w-[250px] h-[250px] transform rotate-12 text-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/30 text-white absolute top-4 left-4"
          onClick={onBack}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Title and Metrics */}
        <div className="mt-auto mb-6 text-white">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <div className="flex gap-3">
            <Badge
              variant="secondary"
              className="py-2 px-4 bg-gray-900 border text-white border-white/20"
            >
              <History className="w-4 h-4 mr-2" />
              {lastVisit}
            </Badge>
            <Badge
              variant="secondary"
              className="py-2 px-4 bg-gray-900 text-white border border-white/20"
            >
              <Clock className="w-4 h-4 mr-2" />
              {readingTime}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
