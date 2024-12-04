"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <Link href="/langgraph-agent">
          <Button>Go to LangGraph Agent</Button>
        </Link>
        <Link href="/operations">
          <Button>Go to Operations</Button>
        </Link>
      </div>
    </section>
  );
}
