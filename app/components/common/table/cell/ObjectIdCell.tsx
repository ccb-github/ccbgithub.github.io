import { type CommonTableCellProps } from "#/types/tableCell"

export default function ObjectIdCell({ value }: CommonTableCellProps) {
  return <>{value as string}</>
}
