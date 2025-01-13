import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/custom/badge";
import { GlassWater } from "lucide-react";
import { BorderedIcon } from "@/components/ui/icons/BorderIcons";
import { Label } from "@/components/ui/custom/label";

interface TaskCardProps {
  title: string;
  createdBy: string;
  avatarUrl?: string;
  status?: "ongoing" | "completed" | "pending";
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  createdBy,
  avatarUrl = "/api/placeholder/32/32",
  status = "ongoing",
  className,
}) => {
  return (
    <div className={cn("w-full max-w-md rounded-3xl flex flex-col", className)}>
      {/* Top */}
      {/* relative for (Absolute behind component)  */}
      <div className="relative flex h-10 top-1 w-full">
        {/* Top Left */}
        {/* relative for (SVG)  */}
        <div className="relative bg-gray-200 w-7/12 rounded-tl-3xl pr-1 pt-3 pl-5 pb-0">
          <Badge icon={GlassWater}>Garden ordering</Badge>
          {/* SVG */}
          <div className="absolute top-0 -right-[64px] h-10 text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 73 45"
              className="w-full h-full fill-current"
            >
              <path d="M29 18C26.3718 14.4121 14.1513 -0.00146822 0 1.48157e-07V44.8258L72.5 45C61.69 44.8258 49.8647 42.0967 43 34.5C36.1353 26.9033 31.6282 21.5879 29 18Z" />
            </svg>
          </div>
        </div>

        {/* Absolute (behind) */}
        <div className="-z-10">
          <div className="absolute top-0 right-0 w-4/5 h-[140%] bg-green-300  rounded-tr-3xl rounded-bl-3xl -z-10 "></div>
        </div>
      </div>
      {/* Bottom */}
      <div className="rounded-tr-3xl rounded-br-3xl rounded-bl-3xl bg-gray-200">
        <div className="flex h-full flex-start pb-3 pt-5 px-4">
          <div className="flex ">
            {/* Bottom Left */}
            <div className="flex flex-start flex-col">
              <BorderedIcon iconName="Snail" className="w-7 h-7" />
            </div>
            {/* Bottom Right */}
            <div className="flex flex-col pl-3">
              {/* Title Task */}
              <div className="leading-[1] text-xl line-clamp-2">
                Do shopping to the garden mather
              </div>
              <div className="flex gap-2 pt-2">
                <Label color="#FFCDB2">shopping list</Label>
                <Label color="#D0F0C0">shopping list</Label>
                <Label color="#B0E0E6">shopping list</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
