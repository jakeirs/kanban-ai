import "server-only";

import { Client } from "@notionhq/client";
import { cache } from "react";

const database_id = process.env.NOTION_DATABASE_ID || "";

// NOTION CLIENT -> ONLY SETUP
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getPages = cache(() => {
  return notionClient.databases.query({
    // POST
    database_id,
  });
});

export const filteredRows = async () => {
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
