"use server";

import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export async function printTextAction(email: string) {
  // do some server actions
  let response = { isOK: false, error: "" };

  try {
    const checkIfUserPaid = await fetchQuery(api.users.checkIfUserPaid, {
      email,
    });
    if (checkIfUserPaid) {
      return JSON.stringify({ ...response, isOk: true });
    }
  } catch (err) {
    return JSON.stringify(response);
  }

  return JSON.stringify(response);
}
