"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="langgraph">
            My implementation of LangGraph - get the current time
          </Label>
          <Link href="/langgraph-agent">
            <Button id="langgraph">Go to LangGraph Agent</Button>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="chat-tools">
            Implementation of AI-SDK Vercel - 3 tools connected - Weather -
            location - Ask for confirmation
          </Label>
          <Link href="/chat-with-tools">
            <Button id="chat-tools">Chat with tools</Button>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="operations">
            My implementation of AI-SDK Vercel - tools to read all shopping list
            from the localStorage and toggleSelected one
          </Label>
          <Link href="/operations">
            <Button id="operations">Go to Operations</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="kanban">
            My implementation of Kanban manage by AI-SDK Vercel - tools
          </Label>
          <Link href="/kanban">
            <Button id="kanban">Go to Kanban</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
