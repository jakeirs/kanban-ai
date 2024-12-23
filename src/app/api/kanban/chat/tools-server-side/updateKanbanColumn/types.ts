import { z } from "zod";

export const idsOfTasksThatWillBeAffectedZod = z
  .array(
    z.object({
      id: z.string().describe("Id of the tasks / item that will be affected"),
      action: z
        .union([
          z
            .literal("created")
            .describe("use this literal for items that was just created"),
          z
            .literal("updated")
            .describe("use this literal for items that was only updated"),
        ])
        .describe("action that "),
    })
  )
  .describe("Array of Ids of the tasks that will be affcted");

  export type IdsOfTasksThatWillBeAffected = z.infer<typeof idsOfTasksThatWillBeAffectedZod>;