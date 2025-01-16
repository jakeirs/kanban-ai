import { DollarSign, Clock, MapPin } from "lucide-react";

interface SummaryIconsProps {
  salary?: string;
  jobTime?: string;
  location?: string;
}

export const SummaryIcons = ({
  salary = "$250/M",
  jobTime = "Full Time",
  location = "New York",
}: SummaryIconsProps) => {
  return (
    <div className="flex justify-around w-full gap-4">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-2">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-gray-500">Salary</span>
        <span className="text-sm font-medium">{salary}</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-2">
          <Clock className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-gray-500">Job Time</span>
        <span className="text-sm font-medium">{jobTime}</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-2">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-gray-500">Location</span>
        <span className="text-sm font-medium">{location}</span>
      </div>
    </div>
  );
};
