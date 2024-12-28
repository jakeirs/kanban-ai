"use client";

import CreateUser from "./_root/CreateUser";

export default function HomePage() {
  return (
    <section className="container grid grid-cols-2 gap-6 pt-6 pb-8 tems-center f md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <CreateUser />
      </div>
    </section>
  );
}
