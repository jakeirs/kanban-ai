import { Button } from "@/components/ui/button";
import { ProfileForm } from "./_parts/form";

export default function IndexPage() {
  return (
    <div>
      IndexPage
      <div>
        Login To course content
        <Button asChild>Siema</Button>
        <div>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
