"use client";

import ThemeToggle from "@/components/blocks/theme-toggle";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

export default function MainPage() {
  return (
    <div>
      <ThemeToggle />
      It's a paid course accesses
      <Button variant="destructive" asChild>
        <SignOutButton>Sign Out</SignOutButton>
      </Button>
    </div>
  );
}
