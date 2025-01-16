import { User, DollarSign, FileText, Scale, LucideIcon } from "lucide-react"

export interface DetailsProps {
  customer: string
  price: string
  description: string
  weight: string
}

export interface TagProps {
  icon: LucideIcon
  label: string
  className?: string
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export const detailsProps: DetailsProps = {
  customer: "Ella Doer",
  price: "1334 $",
  description: "Clothes",
  weight: "1,2 kg"
}

export const tagsProps: Record<keyof DetailsProps, TagProps> = {
  customer: {
    icon: User,
    label: detailsProps.customer,
    variant: "secondary"
  },
  price: {
    icon: DollarSign,
    label: detailsProps.price,
    variant: "secondary"
  },
  description: {
    icon: FileText,
    label: detailsProps.description,
    variant: "secondary"
  },
  weight: {
    icon: Scale,
    label: detailsProps.weight,
    variant: "secondary"
  }
}
