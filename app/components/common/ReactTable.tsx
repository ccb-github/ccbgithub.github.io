"use client"
import { schemaJson } from "#/lib/schema"
import type { SchemaResultMapper, NormalSchemaName, SchemaJson, SchemaName } from "#/types/schema"
import React, { useContext, useEffect, useMemo, useRef } from "react"
import { FaReacteurope, FaSort, FaSortDown, FaSortUp } from "react-icons/fa"
import { FilterValue, Row, useSortBy, useTable } from "react-table"
import { BSON } from "realm-web"
import Button from "./Button"
import SearchBar from "./SearchBar"
import { useTranslation } from "#/lib/i18n/client"
import Link from "next/link"
import { usePathname } from "next/navigation"


type BaseFilterProps = {
  filterValue: FilterValue
  setFilter: any
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

function CustomRender({ value, type }: { value: unknown; type: string }) {
  switch (type) {
    case "int":
      return <p>{value as number}</p>
    case "double":
      return <p>{value as number}</p>
    case "string":
      return <p>{value as string}</p>
    case "objectId":
      return (
        <Link href={(value as BSON.ObjectID).toString()}>
          {(value as BSON.ObjectID).toString()}
        </Link>
      )

    case "date":
      return <p>{value as string}</p>
    default:
      return <p>{JSON.stringify(value)}</p>
  }
}

type ReactTableProps<DataItem, PrimaryKeyType = string> = {
  data: readonly DataItem[]
  className?: string
  trClass?: string
  schemaType: NormalSchemaName
  columnAccessors?: keyof DataItem
  deleteEnabled: boolean
  customColumns?: ((id: PrimaryKeyType) => React.ReactNode)[]
  lng: string
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
export default function ReactTable<
  DataItem extends SchemaResultMapper[NormalSchemaName],
>({
  columnAccessors: columnAccessorsProp,
  data,
  schemaType,
  customColumns: actionButtons,
  lng,
}: ReactTableProps<DataItem>) {
  //TODO the language props
  const { t } = useTranslation(lng, schemaType.toLowerCase())
  // const [columnResizeMode] = useState<ColumnResizeMode>(
  //   ColumnResizeMode["onChange"],
  // )
  const schemaPropertiesRef = useRef(schemaJson[schemaType].properties)
  const currentPath = usePathname()

  //If we do not give the display column list, default to be all the properties list in schemaObject
  const columnAccessors =
    columnAccessorsProp || Object.keys(schemaPropertiesRef.current)

  // TODO customize Table head,
  // TODO red sort the columnList first 
  const tableHeadRef = useRef(
    columnNameList.sort().map((property) => ({
      Header: schemaPropertiesRef.current[property].name,
      accessor: schemaPropertiesRef.current[property].name,
    })),
  )

  const columns = useMemo(() => {
    return columnAccessors.sort().map((property) => ({
      Header: schemaPropertiesRef.current[property].name,
      accessor: schemaPropertiesRef.current[property].name,
    }))
  }, [columnAccessors])

  const defaultColumn = React.useMemo(
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
        // useFilters,
        // useGlobalFilter,
      },
      useSortBy,
    )
  return (
    <>
      <SearchBar
        placeHolder={t("Start searching")}
        searchSchemaName={"Product"}
        onSearchSubmit={function () {}}
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
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                      >
                        {t(column.render("Header") as string)}
                        {column.isSorted ? (
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
            const { _id } = row.original
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
                        type={schemaPropertiesRef.current[cell.column.id].type}
                      />
                    </td>
                  )
                })}
                <th scope="row" className="space-x-2 h-8">
                  {actionButtons?.map((actionButton) =>
                    // eslint-disable-next-line react/jsx-key
                    actionButton(_id),
                  )}
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
