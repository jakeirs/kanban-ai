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
import type * as tables_kanban_defaultValues from "../tables/kanban/defaultValues.js";
import type * as tables_kanban_logic_initKanbanBoardLogic from "../tables/kanban/logic/initKanbanBoardLogic.js";
import type * as tables_kanban_logic_visitKanbanPageLogic from "../tables/kanban/logic/visitKanbanPageLogic.js";
import type * as tables_kanban_mutations_moveItemToColumn from "../tables/kanban/mutations/moveItemToColumn.js";
import type * as tables_kanban_mutations_patchColumns from "../tables/kanban/mutations/patchColumns.js";
import type * as tables_kanban_queries_getBoardById from "../tables/kanban/queries/getBoardById.js";
import type * as tables_kanban_table from "../tables/kanban/table.js";
import type * as tables_kanban_types from "../tables/kanban/types.js";
import type * as tables_userKanbanBoard_mutations_patchKanbanBoardsRelation from "../tables/userKanbanBoard/mutations/patchKanbanBoardsRelation.js";
import type * as tables_userKanbanBoard_table from "../tables/userKanbanBoard/table.js";
import type * as tables_userKanbanBoard_types from "../tables/userKanbanBoard/types.js";
import type * as tables_users_mutations_createUser from "../tables/users/mutations/createUser.js";
import type * as tables_users_table from "../tables/users/table.js";
import type * as tables_users_types from "../tables/users/types.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "tables/kanban/defaultValues": typeof tables_kanban_defaultValues;
  "tables/kanban/logic/initKanbanBoardLogic": typeof tables_kanban_logic_initKanbanBoardLogic;
  "tables/kanban/logic/visitKanbanPageLogic": typeof tables_kanban_logic_visitKanbanPageLogic;
  "tables/kanban/mutations/moveItemToColumn": typeof tables_kanban_mutations_moveItemToColumn;
  "tables/kanban/mutations/patchColumns": typeof tables_kanban_mutations_patchColumns;
  "tables/kanban/queries/getBoardById": typeof tables_kanban_queries_getBoardById;
  "tables/kanban/table": typeof tables_kanban_table;
  "tables/kanban/types": typeof tables_kanban_types;
  "tables/userKanbanBoard/mutations/patchKanbanBoardsRelation": typeof tables_userKanbanBoard_mutations_patchKanbanBoardsRelation;
  "tables/userKanbanBoard/table": typeof tables_userKanbanBoard_table;
  "tables/userKanbanBoard/types": typeof tables_userKanbanBoard_types;
  "tables/users/mutations/createUser": typeof tables_users_mutations_createUser;
  "tables/users/table": typeof tables_users_table;
  "tables/users/types": typeof tables_users_types;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
