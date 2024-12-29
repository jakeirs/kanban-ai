/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as tables_kanban_defaultValues from "../tables/kanban/defaultValues.js";
import type * as tables_kanban_logic_initKanbanBoardLogic from "../tables/kanban/logic/initKanbanBoardLogic.js";
import type * as tables_kanban_logic_visitKanbanPageLogic from "../tables/kanban/logic/visitKanbanPageLogic.js";
import type * as tables_kanban_mutations_moveItemToColumn from "../tables/kanban/mutations/moveItemToColumn.js";
import type * as tables_kanban_mutations_patchColumns from "../tables/kanban/mutations/patchColumns.js";
import type * as tables_kanban_queries_getCurrentUserKanbanId from "../tables/kanban/queries/getCurrentUserKanbanId.js";
import type * as tables_kanban_queries_getKanbanBoard from "../tables/kanban/queries/getKanbanBoard.js";
import type * as tables_kanban_table from "../tables/kanban/table.js";
import type * as tables_kanban_types from "../tables/kanban/types.js";
import type * as tables_userKanbanBoard_mutations_patchKanbanBoardsRelation from "../tables/userKanbanBoard/mutations/patchKanbanBoardsRelation.js";
import type * as tables_userKanbanBoard_table from "../tables/userKanbanBoard/table.js";
import type * as tables_userKanbanBoard_types from "../tables/userKanbanBoard/types.js";
import type * as tables_users_queries_getCurrentUser from "../tables/users/queries/getCurrentUser.js";
import type * as tables_users_table from "../tables/users/table.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  http: typeof http;
  "tables/kanban/defaultValues": typeof tables_kanban_defaultValues;
  "tables/kanban/logic/initKanbanBoardLogic": typeof tables_kanban_logic_initKanbanBoardLogic;
  "tables/kanban/logic/visitKanbanPageLogic": typeof tables_kanban_logic_visitKanbanPageLogic;
  "tables/kanban/mutations/moveItemToColumn": typeof tables_kanban_mutations_moveItemToColumn;
  "tables/kanban/mutations/patchColumns": typeof tables_kanban_mutations_patchColumns;
  "tables/kanban/queries/getCurrentUserKanbanId": typeof tables_kanban_queries_getCurrentUserKanbanId;
  "tables/kanban/queries/getKanbanBoard": typeof tables_kanban_queries_getKanbanBoard;
  "tables/kanban/table": typeof tables_kanban_table;
  "tables/kanban/types": typeof tables_kanban_types;
  "tables/userKanbanBoard/mutations/patchKanbanBoardsRelation": typeof tables_userKanbanBoard_mutations_patchKanbanBoardsRelation;
  "tables/userKanbanBoard/table": typeof tables_userKanbanBoard_table;
  "tables/userKanbanBoard/types": typeof tables_userKanbanBoard_types;
  "tables/users/queries/getCurrentUser": typeof tables_users_queries_getCurrentUser;
  "tables/users/table": typeof tables_users_table;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
