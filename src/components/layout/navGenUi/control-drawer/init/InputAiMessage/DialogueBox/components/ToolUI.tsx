import { DateBeanDialogue } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBean/DateBeanDialogue";
import { MessageCloud } from "../MessageCloud";
import { GetUIToolArgs } from "../hooks/useToolInvocation";

interface ToolUIProps {
  args: GetUIToolArgs;
  messageId: string;
}

export const ToolUI = ({ args, messageId }: ToolUIProps) => {
  if (!args) return null;

  return (
    <div>
      {args.shortMessage && (
        <div className="mb-1">
          <MessageCloud
            key={messageId}
            message={args.shortMessage}
            isUser={false}
            userName={"App"}
          />
        </div>
      )}
      {args.listOfActionToDo && (
        <div className="my-2">
          {args.listOfActionToDo.map((action, index) => {
            return (
              <div className="mb-1">
                <DateBeanDialogue key={index} event={action} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
