import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const KanbanManualDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4">
          Open Kanban Controls
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Kanban Manual Controls</DrawerTitle>
          <DrawerDescription>
            Test and manage Kanban board operations
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Mutations</h3>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">Current Data Preview</h3>
            <div className="bg-gray-100 rounded p-4 overflow-auto max-h-[300px]"></div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default KanbanManualDrawer;
