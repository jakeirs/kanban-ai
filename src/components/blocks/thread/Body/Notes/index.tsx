import { Card } from "@/components/ui/card";
import { AlertOctagonIcon, Search, Building2 } from "lucide-react";

export const Notes = () => {
  return (
    <Card className="p-6 relative bg-green-100 mt-4">
      <div className="flex-1">{/* Main content area */}</div>

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
