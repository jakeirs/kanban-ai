export type Operation = "create" | "edit" | "delete" | "scheduled"

export interface OperationTagProps {
  operation: Operation
  number?: number
  className?: string
}

export const operationTagExamples: OperationTagProps[] = [
  {
    operation: "create",
    number: 3
  },
  {
    operation: "edit"
  },
  {
    operation: "delete",
    number: 1
  },
  {
    operation: "scheduled",
    number: 2,
    className: "ml-2"
  }
]
