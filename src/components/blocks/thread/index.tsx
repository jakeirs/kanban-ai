import Body from "./Body";
import { SharedContext } from "./Mid/SharedContext";
import { Top } from "./Top";

export const Thread = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Top
        username="John Doe"
        handle="@johndoe"
        description="Hello! I love building things!"
        posts={78}
        contributions={2323}
      />
      <Body />
      <SharedContext />
    </div>
  );
};
