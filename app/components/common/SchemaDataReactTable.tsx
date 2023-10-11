"use client"
import { schemaJson } from "#/lib/schema"
import type { SchemaResultMapper, NormalSchemaName } from "#/types/schema"
import React, { useMemo, useRef } from "react"
import { FaReacteurope, FaSort, FaSortDown, FaSortUp } from "react-icons/fa"
import {
  FilterValue,
  Row,
  useFilters,
  useSortBy,
  useTable,
  useGlobalFilter,
  Column,
} from "react-table"
import Button from "./Button"
import SearchBar from "./SearchBar"
import { useTranslation } from "#/lib/i18n/client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { toSchemaTypestring } from "#/lib/stringFactory"
import { CustomRender } from "#/lib/reactTable/render"

type BaseFilterProps = {
  filterValue: FilterValue
  setFilter: (newFitler: unknown) => unknown
  preFilteredRows: Row[]
  id: string
}

// enum ColumnResizeMode {
//   onChange = "onChange",
//   onEnd = "onEnd",
// }
// TODO Empty data indicate
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: {
  column: BaseFilterProps
}) {
  const count = preFilteredRows.length
  return (
    <input
      className="max-w-full"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

type TableOperation = {
  type: "delete" | "update" | "insert"
}

type ReactTableProps<
  DataItem extends { _id: string },
  PrimaryKeyType = string,
> = {
  data: readonly DataItem[]
  className?: string
  trClass?: string
  schemaType: NormalSchemaName
  columnAccessors?: Array<keyof DataItem>
  deleteEnabled: boolean
  customColumn?: (id: PrimaryKeyType) => React.ReactNode
  lng: string
  operationSign?: TableOperation[]
  deleteOperation?: (
    deleteItem: SchemaResultMapper[NormalSchemaName],
  ) => Promise<boolean>
  // columns: readonly Column<{}>[]
}
/**
 * Prop def
 * @typedef {ReactTableProps} TheProps
 * @member {SchemaName} schemaType
/**
 * Description
 * @param {ReactTableProps} props -- The react props
 * @returns {React.ReactNode}
 */
export default function SchemaDataReactTable<DataItem extends { _id: string }>({
  columnAccessors: columnAccessorsProp,
  data,
  schemaType,
  customColumn,
  lng,
}: ReactTableProps<DataItem>) {
  //TODO the language props
  const { t } = useTranslation(lng, schemaType.toLowerCase())
  // const [columnResizeMode] = useState<ColumnResizeMode>(
  //   ColumnResizeMode["onChange"],
  // )
  const schemaProperties = useMemo(
    () => schemaJson[schemaType].properties,
    [schemaType],
  )
  const currentPath = usePathname()

  //If we do not give the display column list, default to be all the properties list in schemaObject
  const columnAccessors = columnAccessorsProp || Object.keys(schemaProperties)

  // TODO customize Table head,
  // TODO red sort the columnList first
  // const tableHeadRef = useRef(
  //   columnNameList.sort().map((property) => ({
  //     Header: schemaProperties[property].name,
  //     accessor: schemaProperties[property].name,
  //   })),
  // )

  const columns = useMemo(() => {
    return columnAccessors.sort().map((property) => ({
      Header: schemaProperties[property].name,
      accessor: schemaProperties[property].name,
    }))
  }, [columnAccessors, schemaProperties])

  const defaultColumn = useMemo(
    () => ({
      // Our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useSortBy,
      useFilters,
      useGlobalFilter,
    )
  return (
    <>
      <SearchBar
        placeHolder={t("Start searching")}
        searchSchemaName={toSchemaTypestring(schemaType)}
        onSearchSubmit={function () {}}
        className="flex flex-row items-center justify-start"
      >
        <Button onClick={() => {}}>
          <Link href={`./${currentPath.split("/").at(-1)}/insert`}>
            <FaReacteurope />
            {t("Insert", { ns: "common" })}
          </Link>
        </Button>
      </SearchBar>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...otherHeaderGroupProps } =
              headerGroup.getHeaderGroupProps()
            return (
              <tr key={key} {...otherHeaderGroupProps}>
                <th scope="column">index</th>
                {headerGroup.headers.map((column) => {
                  const { key, ...otherHeaderProps } = column.getHeaderProps()
                  const { key: sortByWidgetkey, ...otherSortByToggleProps } =
                    column.getHeaderProps(column.getSortByToggleProps())
                  return (
                    <th
                      key={key}
                      {...otherHeaderProps}
                      className="bg-slate-400"
                      style={{
                        maxWidth: "7rem",
                        background: "aliceblue",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {/* sort widget */}
                      <span
                        className="cursor-pointer"
                        key={sortByWidgetkey}
                        {...otherSortByToggleProps}
                      >
                        {t(column.render("Header") as string)}

                        {column.canSort && column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown className="inline-block" />
                          ) : (
                            <FaSortUp className="inline-block" />
                          )
                        ) : (
                          <FaSort className="inline-block" />
                        )}
                      </span>
                      {/* {column.render("Filter")} */}
                    </th>
                  )
                })}
                <th scope="column">{t("Action")}</th>
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            const { key, ...otherRowProps } = row.getRowProps()
            return (
              <tr key={key} {...otherRowProps}>
                <th scope="row">{index + 1}</th>
                {row.cells.map((cell) => {
                  const { key, ...otherCellProps } = cell.getCellProps()
                  return (
                    <td
                      key={key}
                      {...otherCellProps}
                      className="overflow-x-clip"
                      style={{
                        padding: "10px",
                        maxWidth: "12rem",
                        border: "solid 1px gray",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <CustomRender
                        value={cell.value}
                        dataType={
                          schemaProperties[cell.column.id].dataType
                        }
                      />
                    </td>
                  )
                })}
                <th scope="row" className="space-x-2 h-8">
                  {/*   <Button
                    className="m-auto"
                    dataId={(row.original as { _id: string })._id}
                    onClick={(event) => {
                      const self: HTMLButtonElement =
                        event.currentTarget as HTMLButtonElement
                      deleteDocuments(realmApp.currentUser!, schemaType, {
                        _id: fieldConvert(
                          self.dataset.id!,
                          schemaProperties["_id"].dataType,
                        ),
                      })
                        .then(() => {
                          router.refresh()
                        })
                        .catch((error) => {
                          throw error
                        })
                    }}
                    disabled={!deleteEnabled}
                  >
                    {t("Delete")}
                    <FaReacteurope className="inline-block w-4 h-4" />
                  </Button>
                  <Button className="m-auto">
                    <Link
                      href={`/${lng}/${
                        roleUrlMap[realmApp.currentUser?.customData.role]
                      }/edit/${schemaType.toLowerCase()}?id=${
                        row.original["_id"]
                      }`}
                    >
                      {t("Edit", "common")}
                      <EditIcon className="inline-block w-4 h-4" />
                    </Link>
                  </Button> */}
                  {typeof customColumn === "function" &&
                    customColumn(row.original["_id"])}
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
