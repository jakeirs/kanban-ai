"use client";

import * as dateFNS from "date-fns";
import { Init } from "@/components/blocks/init";

(window as any).dateFns = dateFNS;

export default function MobilePage() {
  return (
    <section className="">
      Do some inits <Init />
    </section>
  );
}
