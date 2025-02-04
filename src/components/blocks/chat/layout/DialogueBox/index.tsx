import { Message } from "ai/react";
import { useEffect, useRef } from "react";
import { DialogueBoxCalendar } from "@/components/features/DialogueBoxCalendar/DialogueBoxCalendar";

export interface DialogueBoxProps {
  messages: Message[];
  isLoading?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = (props) => {
  return <DialogueBoxCalendar {...props} />;
};
