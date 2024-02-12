import { cache } from "react";
import { database_id, notionClient } from "./setup";

export const getDatabase = cache(() => {
  return notionClient.databases.query({
    database_id,
  });
});

export const getfilteredFromDatabase = async () => {
  const response = await notionClient.databases.query({
    database_id,
    filter: {
      property: "Slug",
      rich_text: {
        contains: "earth-to-mars",
      },
    },
  });
  return response;
};
