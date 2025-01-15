import { ChatMemoryList } from "./Chat";
import { OperationTag } from "./Chat/ChatCloud/OperationTag";
import { operationTagExamples } from "./Chat/ChatCloud/OperationTag/props";

export function ChatHistory() {
  return (
    <>
      <ChatMemoryList />
      <div>
        {operationTagExamples.map((item) => (
          <OperationTag {...item} />
        ))}
      </div>
    </>
  );
}
