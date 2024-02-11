import ClientConsoleLog from "@/components/technical/ClientConsoleLog";
import { Button } from "@/components/ui/button";
import { filteredRows, getPages, notionClient } from "@/lib/notion/setup";

export default async function HomePage() {
  const pages = await filteredRows();
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        Hello
        <ClientConsoleLog dataToLog={pages} hide />
        <Button>Button</Button>
      </div>
    </section>
  );
}
