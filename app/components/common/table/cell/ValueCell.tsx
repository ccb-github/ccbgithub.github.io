import { type CommonTableCellProps } from "#/types/tableCell"

export default function ValueCell({ value }: CommonTableCellProps) {
  return <>{value as string}</>
}
