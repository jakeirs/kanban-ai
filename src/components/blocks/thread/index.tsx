import Body from "./Body";
import { SharedContext } from "./Mid/SharedContext";

export const Thread = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Body />
      <SharedContext />
    </div>
  );
};
