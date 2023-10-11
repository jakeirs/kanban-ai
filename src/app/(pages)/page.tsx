import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        Hello
        <Button>Button</Button>
      </div>
    </section>
  );
}
