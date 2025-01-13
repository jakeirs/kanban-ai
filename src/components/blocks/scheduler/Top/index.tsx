import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CurrentDate } from "./CurrentDate";

export const Top = () => {
  const date = new Date();
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );

  return (
    <div className="space-y-4 p-4 bg-black text-white">
      <h1 className="text-5xl font-bold">Hey, Simon</h1>

      <div className="flex justify-between items-start">
        <div className="bg-black text-white py-2 flex-1 mr-4">
          <p className="text-sm">
            Enjoy the discounts for matches. Choose a date which fits most
          </p>
          <p className="text-4xl font-bold mt-2">20%</p>
        </div>

        <CurrentDate />
      </div>

      <div className="space-y-3  p-4 rounded-lg">
        <div className="flex items-center text-zinc-400">
          <span className="mr-3">📝</span>
          <p>Review weekly progress notes</p>
        </div>

        <Separator className="bg-zinc-800" />

        <div className="flex items-center text-zinc-400">
          <span className="mr-3">👤</span>
          <p>Team sync with marketing department</p>
        </div>
      </div>
    </div>
  );
};
