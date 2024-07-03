"use client";

import ThemeToggle from "@/components/blocks/theme-toggle";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

export default function MainPage() {
  return (
    <div>
      <ThemeToggle />
      MainPage<Button variant="destructive">Add Button</Button>
      <SignOutButton>Sign Out</SignOutButton>
    </div>
  );
}
