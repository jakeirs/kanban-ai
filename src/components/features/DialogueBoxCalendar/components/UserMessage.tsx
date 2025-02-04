import { MessageCloud } from "./MessageCloud";

interface UserMessageProps {
  content: string;
  id: string;
}

export const UserMessage = ({ content, id }: UserMessageProps) => {
  return (
    <MessageCloud
      key={id}
      message={content}
      isUser={true}
      userName={"Marcin"}
    />
  );
};
