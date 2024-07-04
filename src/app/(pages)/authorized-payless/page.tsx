import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function AboutPage() {
  return (
    <div>
      I registered, but didn't pay
      <div>
        Check me if I paid
        <Button asChild>
          <SignInButton>Sign in button</SignInButton>
        </Button>
      </div>
    </div>
  );
}
