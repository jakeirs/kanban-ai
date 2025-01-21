"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const Init = () => {
  const createProjectsForUser = useMutation(
    api.tables.projects.logic.initProjects.default
  );

  const handleCreateUser = async () => {
    try {
      await createProjectsForUser({});
    } catch (error) {
      console.error("Failed to create projects for user: ", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card className="bg-black text-white rounded-3xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-medium mb-4">Initialize User</h2>

          <Button onClick={handleCreateUser} className="w-full">
            Create Projects for New User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
