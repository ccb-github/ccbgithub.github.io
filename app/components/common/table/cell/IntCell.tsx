import { type CommonTableCellProps } from "#/types/tableCell"

export default function IntCell({ value }: CommonTableCellProps) {
  return <>{value as number}</>
}
