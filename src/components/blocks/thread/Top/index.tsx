import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";

interface TopProps {
  username?: string;
  handle?: string;
  description?: string;
  posts?: number;
  contributions?: number;
}

export function Top({
  username = "Username",
  handle = "@handle",
  description = "No description provided",
  posts = 0,
  contributions = 0,
}: TopProps) {
  return (
    <Card className="rounded-t-none rounded-b-lg p-4 bg-black">
      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <div className="h-24 w-24 rounded-full bg-red-200 flex items-center justify-center">
            <div className="border-4 border-white rounded-full p-1 w-full h-full flex items-center justify-center">
              <UserCircle2 className="w-16 h-16 text-red-500" />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold leading-tight">{username}</h2>
            <p className="text-sm text-muted-foreground">{handle}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="flex gap-4">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{posts}</p>
              <p className="text-xs text-muted-foreground">Post</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{contributions}</p>
              <p className="text-xs text-muted-foreground">Contributions</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
