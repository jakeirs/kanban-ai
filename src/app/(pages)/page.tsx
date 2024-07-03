"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function HomePage() {
  const createUser = useMutation(api.users.createUser);
  const createUserHandler = async () => {
    const userID = await createUser({ email: "Merfi@gmail.com" });

    console.log("userID", userID);
  };
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <Button onClick={createUserHandler}>Create user</Button>
      </div>
    </section>
  );
}