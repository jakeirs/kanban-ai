import { Infer } from "convex/values";
import { userTable } from "./table";

export type User = Infer<typeof userTable.doc>;
