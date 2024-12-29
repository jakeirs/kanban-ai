"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated,  } from "convex/react";
export default function CreateUser() {
  const { signIn, signOut } = useAuthActions();
  
  return (
    <div className="flex items-center gap-4">
      <Unauthenticated>
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          onClick={() => void signIn("github", { redirectTo: "/kanban" })}
        >
          GitHub
        </Button>
      </Unauthenticated>

      <Authenticated>
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          onClick={() => void signOut()}
        >
          Logout
        </Button>
      </Authenticated>
    </div>
  );
}
