import { BeanDays } from "./BeanDays";
import Timeline from "./Timeline";
import { exampleSlots } from "./Timeline/props";
import { Top } from "./Top";

export const Scheduler = () => {
  return (
    <>
      <Top />
      <BeanDays />
      <Timeline slots={exampleSlots} />
    </>
  );
};
