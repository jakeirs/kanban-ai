import Timeline from "./Timeline";
import { exampleSlots } from "./Timeline/props";
import { Top } from "./Top";

export const Scheduler = () => {
  return (
    <>
      <Top />
      <Timeline slots={exampleSlots} />
    </>
  );
};
