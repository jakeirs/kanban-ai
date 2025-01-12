import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils"

type IconNames = keyof typeof LucideIcons;
type LucideIconName = Exclude<
  IconNames,
  "createLucideIcon" | "defaultAttributes"
>;

interface BorderedIconProps {
  iconName: LucideIconName;
  className?: string;
  whiteBorder?: boolean;
}

const formatIconName = (name: string): LucideIconName => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("") as LucideIconName;
};

export const BorderedIcon = ({ iconName = "Camera", className, whiteBorder = true }: BorderedIconProps) => {
  const formattedName = formatIconName(iconName);
  // Use HelpCircle as fallback
  const IconComponent = (LucideIcons[formattedName] ||
    LucideIcons.HelpCircle) as LucideIcons.LucideIcon;

  if (!LucideIcons[formattedName]) {
    console.warn(`Icon "${iconName}" not found, using fallback icon`);
  }

  return (
    <div className={cn("inline-flex items-center justify-center rounded-full bg-white", whiteBorder && "p-1")}>
      <div className="rounded-full bg-gray-800 p-2">
        <IconComponent className={cn("h-6 w-6 text-white", className)} />
      </div>
    </div>
  );
};
