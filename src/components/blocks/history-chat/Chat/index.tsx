import React from "react";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ChatMemoryItem, memoryItems } from "./props";
import { getActionIcon } from "./utils";
import { OperationTag } from "./ChatCloud/OperationTag";

const ChatMemoryCloud: React.FC<{ item: ChatMemoryItem }> = ({ item }) => {
  const isRightSide = ["create", "edit"].includes(item.actionType);

  // Playful Style Classes
  const cardClasses = isRightSide
    ? "bg-gradient-to-br from-pink-300 to-pink-200"
    : "bg-gradient-to-br from-purple-300 to-blue-200";

  const dateClasses = isRightSide
    ? "bg-pink-100 text-pink-600"
    : "bg-blue-100 text-blue-600";

  const textColorClasses = isRightSide ? "text-pink-900" : "text-blue-900";

  return (
    <div className="relative w-full mt-2">
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

              {/* Subtitle */}
              <p className={`text-sm mb-4 opacity-75 ${textColorClasses}`}>
                {item.description || "No description available"}
              </p>

              {/* Operations Grid */}
              <div className="inline-flex gap-2">
                {item.operations?.map((op, index) => (
                  <OperationTag
                    key={index}
                    operation={op.type}
                    number={op.number}
                    className="w-full justify-center"
                  />
                ))}
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
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4">
      {memoryItems.map((item) => (
        <ChatMemoryCloud key={item.id} item={item} />
      ))}
    </div>
  );
};

export { ChatMemoryList };
