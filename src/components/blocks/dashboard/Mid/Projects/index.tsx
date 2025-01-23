"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import type { FormattedProjectDetail } from "../../_dto/formatDashboardDto";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const ProjectTile: React.FC<FormattedProjectDetail> = ({
  title,
  indetifiers,
  id,
  status,
  timeConstraints,
}) => {
  const { colorBg, colorIcon, icon } = indetifiers;

  return (
    <Link href={`/mobile/project/${id}`}>
      <div
        className={cn(
          "cursor-pointer hover:rounded-3xl rounded-3xl hover:bg-gray-900 transition-colors"
        )}
        style={{ backgroundColor: colorBg }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h3 className="font-medium text-black ">{title}</h3>
              {timeConstraints?.endDate && (
                <p className="text-sm text-gray-400">
                  Ends: to {timeConstraints?.endDate}
                </p>
              )}

              <p className="text-sm text-zinc-800">{status}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </Link>
  );
};
