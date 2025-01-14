"use client";

import { useState } from "react";
import { BottomNavBar } from "./BottomNavBar";
import { VoiceDrawer } from "./control-drawer";

export const MobileNav = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleMicrophoneClick = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <BottomNavBar onMicrophoneClick={handleMicrophoneClick} />
      <VoiceDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen} />
    </>
  );
};
