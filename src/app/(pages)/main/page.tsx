import ThemeToggle from "@/components/blocks/theme-toggle";
import { Button } from "@/components/ui/button";

export default async function MainPage() {
  const userStatus = localStorage.getItem("userStatus");

  if (userStatus !== "1") {
    return (
      <div>
        <div>User not authorized. Didn't pay</div>
        <div>You can pay here...</div>
      </div>
    );
  }

  if (userStatus === "1") {
    return (
      <div>
        <ThemeToggle />
        It's a paid course accesses
        <Button variant="destructive" asChild></Button>
      </div>
    );
  }
}
