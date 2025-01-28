import { Message } from "ai/react";

interface DialogueBoxProps {
  messages?: Message[];
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ messages }) => {
  return (
    <div className="flex-1 mb-4 space-y-4 overflow-y-auto max-h-[300px]">
      {messages?.map((m: Message) => (
        <div
          key={m.id}
          className={`p-4 rounded-lg ${
            m.role === "assistant" ? "bg-gray-100 ml-4" : "bg-blue-100 mr-4"
          }`}
        >
          <div className="mb-2 text-sm font-semibold text-gray-600">
            {m.role.charAt(0).toUpperCase() + m.role.slice(1)}
          </div>
          <div className="text-gray-800">{m.content}</div>
        </div>
      ))}
    </div>
  );
};
