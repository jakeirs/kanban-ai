import "server-only";

import { Client } from "@notionhq/client";
import { cache } from "react";

export const database_id = process.env.NOTION_DATABASE_ID || "";

// NOTION CLIENT -> ONLY SETUP
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});
