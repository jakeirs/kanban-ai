import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface MessageCloudProps {
  message: string;
  isUser: boolean;
  userName?: string;
  className?: string;
}

export const MessageCloud = ({
  message,
  isUser,
  userName = "Marcin",
}: MessageCloudProps) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}
      >
        <Avatar className="w-8 h-8">
          <div className="flex h-full items-center justify-center bg-primary text-primary-foreground text-sm">
            {userName[0]}
          </div>
        </Avatar>
        <Card
          className={`p-3 ${isUser ? "bg-primary text-primary-foreground" : ""}`}
        >
          <p className="text-sm whitespace-pre-wrap">{message}</p>
        </Card>
      </div>
    </div>
  );
};
