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
import type * as tables_events_defaultValues from "../tables/events/defaultValues.js";
import type * as tables_events_defaultValuesBigCalendar from "../tables/events/defaultValuesBigCalendar.js";
import type * as tables_events_experimental_search from "../tables/events/experimental/search.js";
import type * as tables_events_mutations_addEvents from "../tables/events/mutations/addEvents.js";
import type * as tables_events_mutations_deleteEvent from "../tables/events/mutations/deleteEvent.js";
import type * as tables_events_mutations_deleteManyEvents from "../tables/events/mutations/deleteManyEvents.js";
import type * as tables_events_mutations_initEvents from "../tables/events/mutations/initEvents.js";
import type * as tables_events_mutations_patchEvents from "../tables/events/mutations/patchEvents.js";
import type * as tables_events_mutations_updateSelectedEvents from "../tables/events/mutations/updateSelectedEvents.js";
import type * as tables_events_mutations_utils_deleteEventsUtil from "../tables/events/mutations/utils/deleteEventsUtil.js";
import type * as tables_events_queries_getCurrentUserEvents from "../tables/events/queries/getCurrentUserEvents.js";
import type * as tables_events_table from "../tables/events/table.js";
import type * as tables_events_types from "../tables/events/types.js";
import type * as tables_events_typesZod from "../tables/events/typesZod.js";
import type * as tables_kanban_defaultValues from "../tables/kanban/defaultValues.js";
import type * as tables_kanban_logic_initKanbanBoardLogic from "../tables/kanban/logic/initKanbanBoardLogic.js";
import type * as tables_kanban_logic_visitKanbanPageLogic from "../tables/kanban/logic/visitKanbanPageLogic.js";
import type * as tables_kanban_mutations_moveItemToColumn from "../tables/kanban/mutations/moveItemToColumn.js";
import type * as tables_kanban_mutations_patchColumns from "../tables/kanban/mutations/patchColumns.js";
import type * as tables_kanban_queries_getCurrentUserForUpdateKanbanBoard from "../tables/kanban/queries/getCurrentUserForUpdateKanbanBoard.js";
import type * as tables_kanban_table from "../tables/kanban/table.js";
import type * as tables_kanban_types from "../tables/kanban/types.js";
import type * as tables_kanbanDescription_mutations_createDescription from "../tables/kanbanDescription/mutations/createDescription.js";
import type * as tables_kanbanDescription_mutations_deleteDescription from "../tables/kanbanDescription/mutations/deleteDescription.js";
import type * as tables_kanbanDescription_mutations_patchDescription from "../tables/kanbanDescription/mutations/patchDescription.js";
import type * as tables_kanbanDescription_mutations_patchDescriptionByTaskId from "../tables/kanbanDescription/mutations/patchDescriptionByTaskId.js";
import type * as tables_kanbanDescription_queries_getCurrentUserKanbanDescriptionForTask from "../tables/kanbanDescription/queries/getCurrentUserKanbanDescriptionForTask.js";
import type * as tables_kanbanDescription_table from "../tables/kanbanDescription/table.js";
import type * as tables_kanbanDescription_types from "../tables/kanbanDescription/types.js";
import type * as tables_projects_defaultValues from "../tables/projects/defaultValues.js";
import type * as tables_projects_logic_initProjects from "../tables/projects/logic/initProjects.js";
import type * as tables_projects_mutations_patchProjects from "../tables/projects/mutations/patchProjects.js";
import type * as tables_projects_queries_getById from "../tables/projects/queries/getById.js";
import type * as tables_projects_queries_getCurrentUserProjects from "../tables/projects/queries/getCurrentUserProjects.js";
import type * as tables_projects_queries_getForDashboard from "../tables/projects/queries/getForDashboard.js";
import type * as tables_projects_queries__dto_forDashboardDto from "../tables/projects/queries/_dto/forDashboardDto.js";
import type * as tables_projects_queries__dto_utilts_events from "../tables/projects/queries/_dto/utilts/events.js";
import type * as tables_projects_table from "../tables/projects/table.js";
import type * as tables_projects_types from "../tables/projects/types.js";
import type * as tables_projects_typesZod from "../tables/projects/typesZod.js";
import type * as tables_projects___projectStructureFuture__ from "../tables/projects/__projectStructureFuture__.js";
import type * as tables_userKanbanBoard_mutations_patchKanbanBoardsRelation from "../tables/userKanbanBoard/mutations/patchKanbanBoardsRelation.js";
import type * as tables_userKanbanBoard_table from "../tables/userKanbanBoard/table.js";
import type * as tables_userKanbanBoard_types from "../tables/userKanbanBoard/types.js";
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
  "tables/events/defaultValues": typeof tables_events_defaultValues;
  "tables/events/defaultValuesBigCalendar": typeof tables_events_defaultValuesBigCalendar;
  "tables/events/experimental/search": typeof tables_events_experimental_search;
  "tables/events/mutations/addEvents": typeof tables_events_mutations_addEvents;
  "tables/events/mutations/deleteEvent": typeof tables_events_mutations_deleteEvent;
  "tables/events/mutations/deleteManyEvents": typeof tables_events_mutations_deleteManyEvents;
  "tables/events/mutations/initEvents": typeof tables_events_mutations_initEvents;
  "tables/events/mutations/patchEvents": typeof tables_events_mutations_patchEvents;
  "tables/events/mutations/updateSelectedEvents": typeof tables_events_mutations_updateSelectedEvents;
  "tables/events/mutations/utils/deleteEventsUtil": typeof tables_events_mutations_utils_deleteEventsUtil;
  "tables/events/queries/getCurrentUserEvents": typeof tables_events_queries_getCurrentUserEvents;
  "tables/events/table": typeof tables_events_table;
  "tables/events/types": typeof tables_events_types;
  "tables/events/typesZod": typeof tables_events_typesZod;
  "tables/kanban/defaultValues": typeof tables_kanban_defaultValues;
  "tables/kanban/logic/initKanbanBoardLogic": typeof tables_kanban_logic_initKanbanBoardLogic;
  "tables/kanban/logic/visitKanbanPageLogic": typeof tables_kanban_logic_visitKanbanPageLogic;
  "tables/kanban/mutations/moveItemToColumn": typeof tables_kanban_mutations_moveItemToColumn;
  "tables/kanban/mutations/patchColumns": typeof tables_kanban_mutations_patchColumns;
  "tables/kanban/queries/getCurrentUserForUpdateKanbanBoard": typeof tables_kanban_queries_getCurrentUserForUpdateKanbanBoard;
  "tables/kanban/table": typeof tables_kanban_table;
  "tables/kanban/types": typeof tables_kanban_types;
  "tables/kanbanDescription/mutations/createDescription": typeof tables_kanbanDescription_mutations_createDescription;
  "tables/kanbanDescription/mutations/deleteDescription": typeof tables_kanbanDescription_mutations_deleteDescription;
  "tables/kanbanDescription/mutations/patchDescription": typeof tables_kanbanDescription_mutations_patchDescription;
  "tables/kanbanDescription/mutations/patchDescriptionByTaskId": typeof tables_kanbanDescription_mutations_patchDescriptionByTaskId;
  "tables/kanbanDescription/queries/getCurrentUserKanbanDescriptionForTask": typeof tables_kanbanDescription_queries_getCurrentUserKanbanDescriptionForTask;
  "tables/kanbanDescription/table": typeof tables_kanbanDescription_table;
  "tables/kanbanDescription/types": typeof tables_kanbanDescription_types;
  "tables/projects/defaultValues": typeof tables_projects_defaultValues;
  "tables/projects/logic/initProjects": typeof tables_projects_logic_initProjects;
  "tables/projects/mutations/patchProjects": typeof tables_projects_mutations_patchProjects;
  "tables/projects/queries/getById": typeof tables_projects_queries_getById;
  "tables/projects/queries/getCurrentUserProjects": typeof tables_projects_queries_getCurrentUserProjects;
  "tables/projects/queries/getForDashboard": typeof tables_projects_queries_getForDashboard;
  "tables/projects/queries/_dto/forDashboardDto": typeof tables_projects_queries__dto_forDashboardDto;
  "tables/projects/queries/_dto/utilts/events": typeof tables_projects_queries__dto_utilts_events;
  "tables/projects/table": typeof tables_projects_table;
  "tables/projects/types": typeof tables_projects_types;
  "tables/projects/typesZod": typeof tables_projects_typesZod;
  "tables/projects/__projectStructureFuture__": typeof tables_projects___projectStructureFuture__;
  "tables/userKanbanBoard/mutations/patchKanbanBoardsRelation": typeof tables_userKanbanBoard_mutations_patchKanbanBoardsRelation;
  "tables/userKanbanBoard/table": typeof tables_userKanbanBoard_table;
  "tables/userKanbanBoard/types": typeof tables_userKanbanBoard_types;
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
