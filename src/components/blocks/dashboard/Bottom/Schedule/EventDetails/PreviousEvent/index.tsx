import { FC } from "react";
import { ChevronRight } from "lucide-react";

interface PreviousEventProps {
  previousDuration?: string;
  nextDuration?: string;
}

export const PreviousEvent: FC<PreviousEventProps> = ({
  previousDuration = "25 Minutes",
  nextDuration = "30 Minutes",
}) => {
  return (
    <div>
      <div className="flex items-stretch mt-3 w-full bg-gradient-to-r from-purple-900 to-purple-600/20 backdrop-blur-sm rounded-l-3xl rounded-r-3xl">
        {/* Previous Event */}
        <div className="flex-1 flex items-center px-6 py-3">
          <span className="text-lg font-medium text-white">
            {previousDuration}
          </span>
        </div>

        {/* Chevron */}
        <div className="p-1">
          <div className="flex items-center justify-center px-4 h-full bg-white rounded-3xl">
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Next Event */}
        <div className="flex-1 flex items-center justify-end px-6 py-3 ">
          <span className="text-lg font-medium text-white">{nextDuration}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center text-center mt-1">
        <div className="text-sm text-gray-800">previous event</div>
        <div className="text-sm text-gray-800">next event</div>
      </div>
    </div>
  );
};
