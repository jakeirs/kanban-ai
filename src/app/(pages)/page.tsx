import { Button } from "@/components/ui/button";
import { getPages, notionClient } from "@/lib/notion/setup";

notionClient;

export default async function HomePage() {
  const pages = await getPages();

  console.log("pages", "ELO");
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        Hello
        <Button>Button</Button>
      </div>
    </section>
  );
}
