"use client";

import { useState } from "react";
import Body from "./Body";
import { SharedContext } from "./Mid/SharedContext";
import { Top } from "./Top";
import { NotesSheet } from "./NotesSheet";

export const Project = () => {
  const [isNotesSheetOpen, setIsNotesSheetOpen] = useState(false);

  const onNotesClick = () => {
    setIsNotesSheetOpen((prev) => !prev);
  };

  const onNotesClose = () => {
    setIsNotesSheetOpen((prev) => false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Top
        username="John Doe"
        handle="@johndoe"
        description="Hello! I love building things!"
        posts={78}
        contributions={2323}
      />
      <Body onClick={onNotesClick} isNotesSheetOpen={isNotesSheetOpen} />
      <SharedContext />
      <NotesSheet isOpen={isNotesSheetOpen} onClose={onNotesClose} />
    </div>
  );
};
