import { cn } from "@/lib/utils";

interface MessageCloudProps {
  message: string;
  isUser: boolean;
  userName?: string;
}

export const MessageCloud = ({
  message,
  isUser,
  userName = "Marcin",
}: MessageCloudProps) => {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%] gap-1",
        isUser ? "items-end ml-auto" : "items-start"
      )}
    >
      {!isUser && (
        <span className="text-sm text-muted-foreground ml-2">{userName}</span>
      )}
      <div
        className={cn(
          "rounded-t-xl p-3 text-sm",
          isUser ? "bg-zinc-100 rounded-bl-xl" : "bg-green-200 rounded-br-xl"
        )}
      >
        {message}
      </div>
    </div>
  );
};
