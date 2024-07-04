"use client";

import { Button } from "@/components/ui/button";
import { Unauthenticated, useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const createUser = useMutation(api.users.createUser);
  const pay = useAction(api.stripe.pay);
  const router = useRouter();

  const createUserHandler = async () => {
    const userID = await createUser({ email: "Merfi@gmail.com" });
  };

  const payHandler = async () => {
    const checkoutUrl = await pay();
    if (checkoutUrl) {
      router.push(checkoutUrl);
    }
  };

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <Button onClick={createUserHandler}>Create user</Button>
        <Button asChild variant="outline">
          <Unauthenticated>
            <SignInButton>Sign Up</SignInButton>
          </Unauthenticated>
        </Button>
        <Button variant="secondary" onClick={payHandler}>
          Pay Button
        </Button>
      </div>
    </section>
  );
}
