import React from "react";
import { Brain, Plus, Pencil, Trash2, Edit, Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ActionType, ChatMemoryItem, memoryItems } from "./props";
import { getActionIcon } from "./utils";

const ChatMemoryCloud: React.FC<{ item: ChatMemoryItem }> = ({ item }) => {
  const isRightSide = ["insert", "edit"].includes(item.actionType);

  // Playful Style Classes
  const cardClasses = isRightSide
    ? "bg-gradient-to-br from-pink-300 to-pink-200"
    : "bg-gradient-to-br from-purple-300 to-blue-200";

  const exchangeCountClasses = isRightSide
    ? "bg-pink-400 text-white"
    : "bg-blue-400 text-white";

  const dateClasses = isRightSide
    ? "bg-pink-100 text-pink-600"
    : "bg-blue-100 text-blue-600";

  const textColorClasses = isRightSide ? "text-pink-900" : "text-blue-900";

  const tagClasses = isRightSide
    ? "bg-pink-100 text-pink-700"
    : "bg-blue-100 text-blue-700";

  const exchangeBorderClasses = isRightSide
    ? "border-pink-200"
    : "border-blue-200";

  return (
    <div className="relative w-full mb-8">
      {/* Date label */}
      <div
        className={`
        absolute 
        top-0 
        ${isRightSide ? "right-0 -translate-y-full" : "left-0 -translate-y-full"}
        mb-2
        py-1
        px-3
        rounded-t-lg
        text-sm
        flex
        items-center
        gap-2
        ${dateClasses}
      `}
      >
        <Calendar className="h-4 w-4" />
        {item.date}
      </div>

      {/* Main card container */}
      <div
        className={`w-full flex ${isRightSide ? "justify-end" : "justify-start"}`}
      >
        <Card
          className={`
          max-w-[80%] 
          p-4 
          rounded-2xl
          border-none
          shadow-lg
          ${cardClasses}
        `}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {getActionIcon(item.actionType)}
            </div>

            <div className="flex-1">
              {/* Summary */}
              <p
                className={`text-lg font-medium leading-tight mb-3 ${textColorClasses}`}
              >
                {item.summary}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                {/* Tags */}
                <div className="flex-1 flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`
                        flex items-center gap-1 
                        px-2 py-1 rounded-full 
                        text-xs
                        ${tagClasses}
                      `}
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>

                {/* Exchange count circle - bigger and on the right */}
                <div
                  className={`
                  flex items-center justify-center 
                  w-12 h-12 
                  rounded-full 
                  text-xl font-medium
                  border-2
                  ${exchangeBorderClasses}
                  ${exchangeCountClasses}
                `}
                >
                  {item.exchangeCount}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ChatMemoryList: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4 space-y-2">
      {memoryItems.map((item) => (
        <ChatMemoryCloud key={item.id} item={item} />
      ))}
    </div>
  );
};

export { ChatMemoryList };
