"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const createUser = useMutation(
    api.tables.users.mutations.createUser.createUser
  );
  const initKanbanBoard = useMutation(
    api.tables.kanban.logic.initKanbanBoardLogic.initKanbanBoardLogic
  );

  const handleCreateUser = async () => {
    try {
      const userId = await createUser({ email });
      localStorage.setItem("userId", String(userId));
      setEmail("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

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
      <Input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-[300px]"
      />
      <Button onClick={handleCreateUser}>Create user</Button>
      <Button onClick={handleCreateKanbanBoard}>Create Kanban Board</Button>
    </div>
  );
}
