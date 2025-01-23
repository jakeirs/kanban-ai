import { FC } from "react";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface PreviousEventProps {
  previousDuration?: Date;
  nextDuration?: Date;
}

export const PreviousEvent: FC<PreviousEventProps> = ({
  previousDuration = new Date(),
  nextDuration = new Date(),
}) => {
  return (
    <div>
      <div className="flex items-stretch mt-3 w-full bg-gradient-to-r from-purple-900 to-purple-600/20 backdrop-blur-sm rounded-l-3xl rounded-r-3xl">
        {/* Previous Event */}
        <div className="flex-1 flex flex-col px-6 py-3">
          <span className="text-lg font-medium text-white">
            {format(previousDuration, "p")}
          </span>
          <span className="text-lg font-light text-white">Zrobić retro</span>
        </div>

        {/* Chevron */}
        <div className="p-1 h-full">
          <div className="flex items-center justify-center px-4 bg-white rounded-full">
            <ChevronRight className="w-10 h-10 text-gray-500" />
          </div>
        </div>

        {/* Next Event */}
        <div className="flex-1 flex flex-col justify-end px-6 py-3 ">
          <span className="text-lg font-medium text-white">
            {format(nextDuration, "p")}
          </span>
          <span className="text-lg font-light text-white">Umyć zęby</span>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center text-center mt-1">
        <div className="text-sm text-gray-800">Previous</div>
        <div className="text-sm text-gray-800">Next</div>
      </div>
    </div>
  );
};
