import ThemeToggle from "@/components/blocks/theme-toggle";
import { Button } from "@/components/ui/button";

export default function MainPage() {
  return (
    <div>
      <ThemeToggle />
      MainPage<Button variant="destructive">Add Button</Button>
    </div>
  );
}
