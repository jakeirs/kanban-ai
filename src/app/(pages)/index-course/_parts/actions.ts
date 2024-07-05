import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";

export async function printTextAction(email: string) {
  // do some server actions

  const checkIfUserPaid = await fetchQuery(api.users.checkIfUserPaid, {
    email,
  });

  if (checkIfUserPaid) {
    return {
      status: "ok",
    };
  }

  return {
    errors: {
      text: !email ? "Text is requred" : undefined,
    },
  };
}
