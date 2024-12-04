import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

interface DrawerInputChatProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function DrawerInputChat({
  input,
  handleInputChange,
  handleSubmit,
}: DrawerInputChatProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 sticky bottom-4 bg-white p-2 rounded-lg shadow"
    >
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message..."
        className="flex-1"
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
