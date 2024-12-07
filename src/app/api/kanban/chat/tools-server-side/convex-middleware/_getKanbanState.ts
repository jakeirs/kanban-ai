import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

/**
  // You can't use useQuery hook in the SERVER_SIDE - do this other way around
 *
  actions or something 
 * 
 */

// export const useKanbanData = () => {
//   const kanbanData = useQuery(api.kanban.getItemsByColumn);

//   return {
//     data: kanbanData,
//     isLoading: kanbanData === undefined,
//   };
// };
