import { type CommonTableCellProps } from "#/types/tableCell"
import Link from "next/link"

export default function ObjectIdCell({ value }: CommonTableCellProps) {
  return <Link href={"./temp"}>{value as string}</Link>
}
