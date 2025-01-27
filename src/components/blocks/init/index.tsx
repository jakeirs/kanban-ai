"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const Init = () => {
  const createProjectsForUser = useMutation(
    api.tables.projects.logic.initProjects.default
  );
  const createEventsForUser = useMutation(
    api.tables.events.mutations.initEvents.default
  );

  const handleCreateUser = async () => {
    try {
      await createProjectsForUser({});
    } catch (error) {
      console.error("Failed to create projects for user: ", error);
    }
  };
  const handleCreateEventsUser = async () => {
    console.log("NEW events created");
    try {
      await createEventsForUser({});
    } catch (error) {
      console.error("Failed to create events for user: ", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card className="bg-black text-white rounded-3xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-medium mb-4">Initialize User</h2>
          <Button
            onClick={handleCreateEventsUser}
            className="w-full  mb-2 bg-red-400 hover:bg-red-500"
          >
            Create Events for New User
          </Button>
          <Button onClick={handleCreateUser} className="w-full">
            Create Projects for New User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
