import { Message } from "ai/react";
import { MessageCloud } from "./MessageCloud";
import { ToolInvocation } from "@ai-sdk/ui-utils";
import { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/getUI/types";
import { DateBeanDialogue } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBean/DateBeanDialogue";

interface GetUIToolArgs {
  message: string;
  shortMessage: string;
  listOfActionToDo: EventFromLLMGenUI[];
}

interface DialogueBoxProps {
  messages?: Message[];
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ messages }) => {
  console.log("messages", messages);
  return (
    <div className="flex-1 mb-4 space-y-4 overflow-y-auto max-h-[300px]">
      {messages?.map((m: Message) => {
        return (
          <div key={m.id}>
            {m.role === "assistant" ? (
              <div>
                <MessageCloud
                  key={m.id}
                  message={m.content}
                  isAi={false}
                  userName={"App"}
                />
                {m.toolInvocations?.map((tool: ToolInvocation) => {
                  if (tool.state === "result" && tool.toolName === "getUI") {
                    const args = tool.args as GetUIToolArgs;

                    console.log("args", args);
                    return (
                      <div key={tool.toolCallId}>
                        <MessageCloud
                          key={m.id}
                          message={args.shortMessage}
                          isAi={false}
                          userName={"App"}
                        />
                        <ul>
                          {args.listOfActionToDo.map((action, index) => (
                            <DateBeanDialogue event={action} />
                          ))}
                        </ul>
                      </div>
                    );
                  } else {
                    return <div>...</div>;
                  }
                  return null;
                })}
              </div>
            ) : (
              <MessageCloud
                key={m.id}
                message={m.content}
                isAi={false}
                userName={"Marcin"}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
