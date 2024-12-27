"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { useEffect, useState } from "react";

export default function CreateUser() {
  const { signIn } = useAuthActions();
  const [tokenState, setState] = useState<any>();
  const token = useAuthToken();

  useEffect(() => {
    setState(token);
  }, [token]);

  console.log("token", token);

  const initKanbanBoard = useMutation(
    api.tables.kanban.logic.initKanbanBoardLogic.initKanbanBoardLogic
  );

  const handleCreateKanbanBoard = async () => {
    try {
      const storedUserId = localStorage.getItem("userId");
      const userId = storedUserId as Id<"users">;

      await initKanbanBoard({ userId });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        className="flex-1"
        variant="outline"
        type="button"
        onClick={() => void signIn("github", { redirectTo: "/kanban" })}
      >
        GitHub
      </Button>
      <Button onClick={handleCreateKanbanBoard}>Create Kanban Board</Button>
    </div>
  );
}
