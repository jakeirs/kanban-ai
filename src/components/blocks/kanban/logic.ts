import { MoveItemToColumnMutationArgs } from "@/convex/tables/kanban/mutations/moveItemToColumn";
import type { KanbanBoard, KanbanColumn } from "@/convex/tables/kanban/types";
import type { DropResult } from "@hello-pangea/dnd";

interface UseKanbanLogicProps {
  kanbanBoard: KanbanBoard;
  setColumnsLocalState: (columns: KanbanColumn[]) => void;
  moveItemMutation: (args: MoveItemToColumnMutationArgs) => Promise<any>;
}

export const useKanbanLogic = ({
  kanbanBoard,
  setColumnsLocalState,
  moveItemMutation,
}: UseKanbanLogicProps) => {
  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    // If dropped outside of a droppable area
    if (!destination) return;
    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newColumns = [...kanbanBoard.columns];
    const sourceColumn = newColumns.find(
      (col) => col.id === source.droppableId
    );
    const destColumn = newColumns.find(
      (col) => col.id === destination.droppableId
    );

    // If not found at all
    if (!sourceColumn || !destColumn) return;

    // Remove from source column
    const [movedItem] = sourceColumn.items.splice(source.index, 1);
    movedItem.id;
    // Add to destination column
    // Remove 0 items, add movedItem on index === destination.index
    destColumn.items.splice(destination.index, 0, movedItem);

    setColumnsLocalState(newColumns);

    // Update the kanban board in the database
    try {
      await moveItemMutation({
        kanbanBoardId: kanbanBoard._id,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        itemId: movedItem.id,
        destinationOrder: destination.index,
      });
    } catch (error) {
      console.error("Failed to update kanban board:", error);
      // Revert the changes if the mutation fails
      if (kanbanBoard?.columns) {
        setColumnsLocalState(kanbanBoard.columns);
      }
    }
  };

  return {
    onDragEnd,
  };
};
