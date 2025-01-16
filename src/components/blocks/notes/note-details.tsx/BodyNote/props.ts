export interface BodyNoteProps {
  description: string;
  readNumber?: number;
  onClick?: () => void;
  className?: string;
}

export const exampleBodyNoteProps: Omit<BodyNoteProps, "onClick"> = {
  description:
    "Key points discussed during the initial project meeting including timeline, goals, and team responsibilities",
  readNumber: 42,
  className: "max-w-2xl mx-auto",
};
