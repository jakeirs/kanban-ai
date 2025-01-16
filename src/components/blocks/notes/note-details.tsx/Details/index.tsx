import { User, DollarSign, FileText, Scale } from "lucide-react";
import { TagWithIcon } from "./Tags";
import { SummaryIcons } from "./SummaryIcons";
import { Thread } from "./Thread";

interface DetailsProps {
  customer: string;
  price: string;
  description: string;
  weight: string;
}

const exampleProps: DetailsProps = {
  customer: "Ella Doer",
  price: "1334 $",
  description: "Clothes",
  weight: "1,2 kg",
};

export function Details({
  customer,
  price,
  description,
  weight,
}: DetailsProps) {
  return (
    <div className="flex flex-col  gap-3">
      <Thread iconColor="red" />
      <div className="inline-flex gap-3 p-4 w-full">
        <TagWithIcon icon={User} label={customer} variant="secondary" />
        <TagWithIcon icon={DollarSign} label={price} variant="secondary" />
        <TagWithIcon icon={FileText} label={description} variant="secondary" />
        <TagWithIcon icon={Scale} label={weight} variant="secondary" />
      </div>
      <SummaryIcons />
    </div>
  );
}
