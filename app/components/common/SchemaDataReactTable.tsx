"use client"

import { normalSchemaJson } from "#/lib/schema"
import React, { useMemo, useState } from "react"
import { FaReacteurope, FaSort, FaSortDown, FaSortUp } from "react-icons/fa"
import Button from "#/components/common/Button"
import SearchBar from "#/components/common/SearchBar"
import { useTranslation } from "#/lib/i18n/client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CustomRender } from "#/lib/reactTable/render"
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { NormalSchemaName, SchemaDataPropType } from "#/lib/schema/format"

/* type BaseFilterProps<DataItem> = {
  setFilter: (newFilter: unknown) => unknown
  preFilteredRows: Row<DataItem>[]
  id: string
}
 */
// function DefaultColumnFilter({
//   column: { filterValue, preFilteredRows, setFilter },
// }: {
//   column: BaseFilterProps
// }) {
//   const count = preFilteredRows.length
//   return (
//     <input
//       className="max-w-full"
//       value={filterValue || ""}
//       onChange={(e) => {
//         setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
//       }}
//       placeholder={`Search ${count} records...`}
//     />
//   )
// }

type TableOperation = {
  type: "delete" | "update" | "insert"
}
type RequiredTableColumnOption<DataItem> = {
  header: string
  accessor: keyof DataItem
  type: SchemaDataPropType
}
/**
 * @property {columnAccessors}
 * @member {string} trClass the css class for tr
 */
type ReactTableProps<
  DataItem extends { _id: string },
  PrimaryKeyType = string,
> = {
  data: DataItem[]
  className?: string
  trClass?: string
  schemaType: NormalSchemaName
  columnAccessors?: Array<keyof DataItem>
  columnOptions: Array<RequiredTableColumnOption<DataItem>>
  deleteEnabled: boolean
  customColumn?: (id: PrimaryKeyType) => React.ReactNode
  lng: string
  operationSign?: TableOperation[]
}
/**
 * Prop def
 * @type {ReactTableProps} TheProps
 * @member {SchemaName} schemaType
 * Description
 * @param {ReactTableProps} props -- The react props
 * @returns {React.ReactNode}
 */
export default function SchemaDataReactTable<DataItem extends { _id: string }>({
  data,
  schemaType,
  columnOptions,
  customColumn,
  lng,
}: ReactTableProps<DataItem>): React.JSX.Element {
  const { t } = useTranslation(lng, schemaType.toLowerCase())
  const schemaProperties = useMemo(
    () => normalSchemaJson[schemaType].properties,
    [schemaType],
  )
  const currentPath = usePathname()
  const [sorting, setSorting] = useState<SortingState>([])
  /**
   * The column definition array with shape of @type{DataItem}
   */
  const columnDefs = useMemo<ColumnDef<DataItem>[]>(() => {
    if (columnOptions === undefined) {
      return Object.keys(data ?? [{ title: "Error message" }]).map(
        (dataKey) => ({
          header: t(dataKey),
          accessorKey: dataKey,
        }),
      )
    }
    return columnOptions.map(({ header, accessor }) => ({
      header,
      accessorKey: accessor,
      filterFn: "includesString",
    }))
  }, [columnOptions, data, t])

  const defaultColumnSetting = useMemo<Partial<Column<DataItem>>>(
    () => ({}),
    [],
  )

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [globalFilter, setGlobalFilter] = React.useState("")
  // Destruct the property we need in Table instance return by "useTable" hook
  const reactTableInstance = useReactTable({
    columns: columnDefs,
    data,
    state: {
      columnFilters,
      globalFilter,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    defaultColumn: defaultColumnSetting,
  })

  //If we do not give the display column list, default to be all the properties list in schemaObject
  //const columnAccessors = columnAccessorsProp || Object.keys(schemaProperties)
  if (data.length === 0 && columnOptions === undefined) {
    return (
      <table>
        <thead>
          <th>
            {t("Data array is empty and no valid column definition give")}
          </th>
        </thead>
      </table>
    )
  }

  const { getHeaderGroups, getRowModel } = reactTableInstance
  return (
    <>
      <SearchBar
        placeHolder={t("Start searching")}
        searchSchemaName={schemaType}
        onSearchSubmit={function () {}}
        className="flex flex-row items-center justify-start"
      >
        {/* Insert button */}
        <Button onClick={() => {}}>
          <Link href={`./${currentPath.split("/").at(-1)}/insert`}>
            <FaReacteurope />
            {t("Insert", { ns: "common" })}
          </Link>
        </Button>
      </SearchBar>
      <table className="border-blue-400">
        <thead>
          {getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                <th scope="column">index</th>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="bg-blue-400 max-w-7 font-bold"
                      colSpan={header.colSpan}
                      style={{
                        color: "black",
                      }}
                    >
                      {flexRender(
                        t(header.column.columnDef.header as string),
                        header.getContext(),
                      )}
                      {/* sort widget */}
                      <span
                        className="cursor-pointer"
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {{
                          asc: <FaSortUp className="inline-block" />,
                          desc: <FaSortDown className="inline-block" />,
                        }[header.column.getIsSorted() as string] ?? (
                          <FaSort className="inline-block" />
                        )}
                      </span>
                    </th>
                  )
                })}
                <th scope="column">{t("Action")}</th>
              </tr>
            )
          })}
        </thead>
        <tbody>
          {getRowModel().rows.map((row, index) => {
            return (
              <tr key={row.id}>
                <th scope="row">{index + 1}</th>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="overflow-x-clip"
                    style={{
                      padding: "10px",
                      maxWidth: "12rem",
                      border: "solid 1px gray",
                      backgroundColor: "lightgray",
                    }}
                  >
                    <CustomRender
                      value={cell.getValue()}
                      roleType={schemaProperties[cell.column.id].roleType}
                      dataType={schemaProperties[cell.column.id].dataType}
                      {...schemaProperties[cell.column.id]}
                    />
                  </td>
                ))}
                <th scope="row" className="space-x-2 h-8">
                  {typeof customColumn === "function" &&
                    customColumn(row.original["_id"])}
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div id="paginationFooter" className="flex items-center gap-2 w-full">
        <Button
          className="rounded"
          onClick={() => reactTableInstance.setPageIndex(0)}
          disabled={!reactTableInstance.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          onClick={() => reactTableInstance.previousPage()}
          disabled={!reactTableInstance.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => reactTableInstance.nextPage()}
          disabled={!reactTableInstance.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() =>
            reactTableInstance.setPageIndex(
              reactTableInstance.getPageCount() - 1,
            )
          }
          disabled={!reactTableInstance.getCanNextPage()}
        >
          {">>"}
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {reactTableInstance.getState().pagination.pageIndex + 1} of{" "}
            {reactTableInstance.getPageCount()}
          </strong>
        </span>
      </div>
    </>
  )
}
