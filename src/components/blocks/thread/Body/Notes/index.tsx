import { Card } from "@/components/ui/card";
import { AlertOctagonIcon, Search, Building2 } from "lucide-react";
import { SmallNotes } from "./SmallNotes";

export const Notes = () => {
  // Mock data for demonstration
  const mockNotes = [
    { id: "1", title: "Meeting notes" },
    { id: "2", title: "Project ideas" },
    { id: "3", title: "Todo list" },
    { id: "4", title: "Weekly goals" },
    { id: "5", title: "Reminders" },
    { id: "6", title: "Important contacts" },
    { id: "7", title: "Resources" },
  ];

  return (
    <Card className="p-6 relative bg-green-100 mt-4">
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Quick Access Notes</h3>
          <SmallNotes notes={mockNotes} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Last Notes</h3>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 flex flex-col items-center bg-stone-50">
            <AlertOctagonIcon className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">40%</div>
            <div className="text-sm text-muted-foreground">20 applies</div>
          </Card>

          <Card className="p-4 flex flex-col items-center bg-stone-50">
            <Search className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">40%</div>
            <div className="text-sm text-muted-foreground">20 applies</div>
          </Card>

          <Card className="p-4 flex flex-col items-center bg-stone-50">
            <Building2 className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">20%</div>
            <div className="text-sm text-muted-foreground">10 applies</div>
          </Card>
        </div>
      </div>
    </Card>
  );
};
