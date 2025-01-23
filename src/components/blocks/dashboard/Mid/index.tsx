"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Video, CircleDot } from "lucide-react";
import Link from "next/link";
import { ProjectTile } from "./Projects";
import type { FormattedProjectDetail } from "../_dto/formatDashboardDto";

const Mid: React.FC<{ projects: FormattedProjectDetail[] }> = ({
  projects,
}) => (
  <div>
    <h2 className="text-lg">Projects:</h2>
    <Card>
      <CardContent className="p-0">
        {projects.map((project, index) => (
          <React.Fragment key={project.id}>
            <ProjectTile {...project} />
            {index < projects.length - 1 && (
              <div className="px-4">
                <Separator className="bg-gray-800" />
              </div>
            )}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default Mid;
