import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const createKanbanItemToolClient = (toolName: string, args: any) => {
  if (toolName !== "createKanbanItem") {
    throw new Error("Wrong Tool was invoked");
  }
  // const createItem = fetchMutation(api.kanban.createItem, {
  //   ...args,
  // });

  // return createItem;
};
