"use client"
import { type CommonTableCellProps } from "#/types/tableCell"
import Link from "next/link"
import { usePathname } from "next/navigation"
type LinkCellProps = {
  relLink: string
} & CommonTableCellProps
export default function LinkCell({ relLink, value }: LinkCellProps) {
  const currentPath = usePathname()
  return (
    <Link href={`./${currentPath.split("/").at(-1)}/${relLink}`}>
      {value as string}
    </Link>
  )
}
