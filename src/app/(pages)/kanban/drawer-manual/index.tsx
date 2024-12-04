import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const KanbanManualDrawer = () => {
  // Mutations
  const initializeColumns = useMutation(api.kanban.initializeColumns);
  const createItem = useMutation(api.kanban.createItem);
  const updateItem = useMutation(api.kanban.updateItem);
  const moveItem = useMutation(api.kanban.moveItem);
  const deleteItem = useMutation(api.kanban.deleteItem);

  // Queries
  const columns = useQuery(api.kanban.getColumns);
  const items = useQuery(api.kanban.getItems);
  const itemsByColumn = useQuery(api.kanban.getItemsByColumn);

  // Example handlers
  const handleInitializeColumns = async () => {
    try {
      await initializeColumns();
      console.log("Columns initialized successfully");
      console.log("Current columns:", columns);
    } catch (error) {
      console.error("Error initializing columns:", error);
    }
  };

  const handleCreateItem = async () => {
    try {
      if (!columns?.[0]?._id) {
        console.error("No columns available. Please initialize columns first.");
        return;
      }

      const newItem = await createItem({
        content: "Example Task " + new Date().toLocaleTimeString(),
        columnId: columns[0]._id as Id<"kanbanColumns">,
        description: "This is an example task",
        priority: "medium",
      });

      console.log("Item created successfully:", newItem);
      console.log("Current items:", items);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      if (!items?.[0]?._id) {
        console.error("No items available to update");
        return;
      }

      await updateItem({
        id: items[0]._id,
        content: "Updated Task " + new Date().toLocaleTimeString(),
        description: "This task was updated",
      });

      console.log("Item updated successfully");
      console.log("Current items:", items);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleMoveItem = async () => {
    try {
      if (!items?.[0]?._id || !columns?.[1]?._id) {
        console.error("No items or columns available for moving");
        return;
      }

      await moveItem({
        itemId: items[0]._id,
        targetColumnId: columns[1]._id as Id<"kanbanColumns">,
        newOrder: 0,
      });

      console.log("Item moved successfully");
      console.log("Current items by column:", itemsByColumn);
    } catch (error) {
      console.error("Error moving item:", error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      if (!items?.[0]?._id) {
        console.error("No items available to delete");
        return;
      }

      await deleteItem({
        id: items[0]._id,
      });

      console.log("Item deleted successfully");
      console.log("Current items:", items);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleShowCurrentState = () => {
    console.log("Current State:");
    console.log("Columns:", columns);
    console.log("Items:", items);
    console.log("Items by Column:", itemsByColumn);
  };

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
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleInitializeColumns}>
                Initialize Columns
              </Button>
              <Button onClick={handleCreateItem}>
                Create Item
              </Button>
              <Button onClick={handleUpdateItem}>
                Update First Item
              </Button>
              <Button onClick={handleMoveItem}>
                Move First Item
              </Button>
              <Button onClick={handleDeleteItem}>
                Delete First Item
              </Button>
              <Button onClick={handleShowCurrentState}>
                Show Current State
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Current Data Preview</h3>
            <div className="bg-gray-100 rounded p-4 overflow-auto max-h-[300px]">
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    columns,
                    items,
                    itemsByColumn,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default KanbanManualDrawer;
