import "server-only";

import { Client } from "@notionhq/client";
import { cache } from "react";

// NOTION CLIENT -> ONLY SETUP
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getPages = cache(() => {
  return notionClient.databases.query({
    // POST
    database_id: process.env.NOTION_DATABASE_ID!,
  });
});
