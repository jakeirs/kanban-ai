import React from "react";
import { Timer, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface ProjectCardProps {
  title: string;
  createdBy: string;
  avatarUrl?: string;
  status?: "ongoing" | "completed" | "pending";
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  createdBy,
  avatarUrl = "/api/placeholder/32/32",
  status = "ongoing",
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-3xl text-white shadow-lg flex flex-col",
        className
      )}
    >
      {/* Top */}
      {/* relative for (Absolute behind component)  */}
      <div className="relative flex h-12 w-full">
        {/* Top Left */}
        {/* relative for (SVG)  */}
        <div className="relative  bg-slate-600 w-5/12 rounded-tl-3xl">
          {/* SVG */}
          <div className="absolute top-0 -right-[76px] h-full text-slate-600">
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
          <div className="absolute top-0 right-0 w-4/5 h-[140%] bg-pink-100  rounded-tr-3xl rounded-bl-3xl -z-10 "></div>
        </div>
      </div>
      {/* Bottom */}
      <div className="rounded-tr-3xl rounded-br-3xl rounded-bl-3xl bg-slate-600 h-24"></div>
    </div>
  );
};

export default ProjectCard;
// Exclude internal utilities and get only icon names
type IconNames = keyof typeof LucideIcons;
type LucideIconName = Exclude<
  IconNames,
  "createLucideIcon" | "defaultAttributes"
>;

interface BorderedIconProps {
  iconName: LucideIconName;
}

const BorderedIcon = ({ iconName = "Camera" }: BorderedIconProps) => {
  const formatIconName = (name: string): LucideIconName => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("") as LucideIconName;
  };

  const formattedName = formatIconName(iconName);
  // Use HelpCircle as fallback
  const IconComponent = (LucideIcons[formattedName] ||
    LucideIcons.HelpCircle) as LucideIcons.LucideIcon;

  if (!LucideIcons[formattedName]) {
    console.warn(`Icon "${iconName}" not found, using fallback icon`);
  }

  return (
    <div className="inline-flex items-center justify-center rounded-full bg-white p-1">
      <div className="rounded-full bg-gray-800 p-2">
        <IconComponent className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

// Example usage showing different icons
const IconDemo = () => {
  return (
    <div className="flex gap-4">
      <BorderedIcon iconName="Camera" />
      <BorderedIcon iconName="Heart" />
      <BorderedIcon iconName="Star" />
      <BorderedIcon iconName="User" />
    </div>
  );
};
