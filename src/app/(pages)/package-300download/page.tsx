import ThemeToggle from "@/components/blocks/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Package300Download() {
  return (
    <div>
      <ThemeToggle />
      <h1>
        <a href="https://github.com/kerwanp/notion-render">
          @notion-render/client
        </a>
      </h1>
      <h2>
        <a href="https://notion-render-docs.vercel.app/guides/styling">
          Dokumentcja
        </a>
      </h2>
      Package-300 download
      <Button variant="destructive">Add Button</Button>
    </div>
  );
}
