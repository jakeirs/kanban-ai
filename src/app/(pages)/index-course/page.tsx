import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function AboutPage() {
  return (
    <div>
      Take me here after pay
      <div>
        Login To course content
        <Button asChild>
          <SignInButton>Sign in button</SignInButton>
        </Button>
      </div>
    </div>
  );
}
  