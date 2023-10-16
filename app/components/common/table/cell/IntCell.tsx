import { type CommonTableCellProps } from "#/types/tableCell"

export default function IntCell({ value }: CommonTableCellProps) {
  return <p>{value as number}</p>
}
