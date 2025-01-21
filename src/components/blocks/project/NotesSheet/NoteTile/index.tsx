import { LucideIcon, Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface NoteTileProps {
  title: string;
  description?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  iconClassName?: string;
  iconColor?: string;
}

export const NoteTile = ({
  title,
  description,
  onClick,
  icon: Icon = Pencil,
  iconClassName = "h-6 w-6",
  iconColor,
}: NoteTileProps) => {
  return (
    <Card
      className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors border-2 bg-slate-300/20"
      onClick={onClick}
    >
      <Icon className={iconClassName} color={iconColor} />
      <p className="font-medium text-sm h-7 text-center w-full line-clamp-2 leading-[1] tracking-tighter">
        {title}
      </p>
      {description && (
        <p className="text-xs text-muted-foreground w-full text-left line-clamp-2 leading-[1] tracking-tighter">
          {description}
        </p>
      )}
    </Card>
  );
};
