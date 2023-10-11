import { type CommonTableCellProps } from "#/types/tableCell"

export default function DoubleCell({ value }: CommonTableCellProps) {
  return <p>{value as number}</p>
}
