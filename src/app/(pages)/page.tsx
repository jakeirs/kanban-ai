import ClientConsoleLog from "@/components/technical/ClientConsoleLog";
import { Button } from "@/components/ui/button";
import { Render } from "@9gustin/react-notion-render";
import {
  getBlocks,
  getfilteredFromDatabase,
  getPage,
  getRecursivelyBlocks,
} from "@/lib/notion";

export default async function HomePage() {
  // const notionPage = await getfilteredFromDatabase();

  const notionBlock = await getBlocks();
  const notionRecursivelyBlock = await getRecursivelyBlocks(
    "b3b3bc4cd37e4e75bec7984dcb4dd04c"
  );

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        Hello
        <Render blocks={notionRecursivelyBlock} useStyles />
        <ClientConsoleLog
          dataToLog={notionRecursivelyBlock}
          name="filteredFromDatabase"
          // hide
        />
        <Button>Button</Button>
      </div>
    </section>
  );
}
