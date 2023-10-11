import { type CommonTableCellProps } from "#/types/tableCell"

export default function StringCell({ value }: CommonTableCellProps) {
  return <p>{value as string}</p>
}
