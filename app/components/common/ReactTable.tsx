//@ts-nocheck
'use client'

import { schemaJson } from '#/lib/constants'
import { SchemaResultMapper, SchemaName } from '#/types/schema'
import React, { useContext, useEffect, useRef } from 'react'
import { FaReacteurope, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { FilterValue, Row, useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table'
import { BSON } from 'realm-web'
import NormalButton from './NormalButton'
import SearchBar from './SearchBar'
import { useTranslation } from '#/lib/i18n/client'
import Link from 'next/link'
import { deleteDocuments } from '#/lib/api/mongoService'
import { useApp } from '#/hooks/useApp'
import { AppContext } from '../AppProvider'
import fieldConvert from '#/lib/fieldConvert'
import { usePathname, useRouter } from 'next/navigation'
import { EditIcon } from '../icons'

type BaseFilterProps = {
  filterValue: FilterValue,
  setFilter: any,
  preFilteredRows: Row[],
  id: string
}
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: {
  column: BaseFilterProps
}) {
  const count = preFilteredRows.length

  return (
    <input
      className='max-w-full'
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: {
  column: {
    filterValue: FilterValue,
    setFilter: any,
    preFilteredRows: Row[],
    id: string
  }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set<string>()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function CustomRender({ value, type }: { value: unknown, type: string }) {
  switch (type) {
    case "int":
      return <p>{(value as number)}</p>
    case "double":
      return <p>{(value as number)}</p>
    case "string":
      return <p>{(value as string)}</p>
    case "objectId":
      return <Link href={(value as BSON.ObjectID).toString()}>{(value as BSON.ObjectID).toString()}</Link>;
    // case "object":
    //   return <p></p>
    case "date":
      return <p>{value}</p>
    default:
      return <p>{JSON.stringify(value)}</p>
  }
}

type ReactTableProps = {
  data: any, className?: string, trClass?: string,
  schemaType: SchemaName,
  columnList?: string[],
  deleteEnabled: boolean,
  lng: string,
  deleteOperation?: (deleteItem: SchemaResultMapper[SchemaName]) => Promise<boolean>
  // columns: readonly Column<{}>[]
}
/**
 * Prop def
 * @typedef {ReactTableProps} TheProps
 * @member {SchemaName} schemaType
 */

/**
 * Description
 * @param {ReactTableProps} props -- The react props
 * @returns {React.ReactNode}
 */
export default function ReactTable({
  columnList: columnNameListProp,
  data,
  schemaType,
  deleteEnabled,
  lng
}: ReactTableProps) {
  //TODO the language props
  const { t } = useTranslation(lng, schemaType.toLowerCase());
  const realmApp = useApp()
  const schemaPropertiesRef = useRef(schemaJson[schemaType].properties);
  const currentPath = usePathname()
  const router = useRouter()
 

 
  const columnNameList =
    columnNameListProp || Object.keys(schemaPropertiesRef.current);
  //Table head
  const tableHeadRef = useRef(
    columnNameList.sort().map((property) => ({
      Header: schemaPropertiesRef.current[property].name,
      accessor: schemaPropertiesRef.current[property].name,
    }))
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: tableHeadRef.current,
        data,
        //@ts-ignore
        defaultColumn,
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    )

  return (
    <>
      <SearchBar
        searchSchemaName={"Enterprise"}
        onSearchSubmit={function (searchResult: string) {
          throw new Error("Function not implemented.");
        }}
      >
        <NormalButton onClick={() => {}}>
          <Link href={`./${currentPath.split('/').at(-1)}/insert`}>
            <FaReacteurope />
            {t("Insert")}
          </Link>
        </NormalButton>
      </SearchBar>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...otherHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...otherHeaderGroupProps}>
                <th scope="column">index</th>
                {headerGroup.headers.map((column) => {
                  const { key, ...otherHeaderProps } = column.getHeaderProps();
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
                      {/*@ts-ignore*/}
                      <span
                        className="cursor-pointer"
                        {...column.getSortByToggleProps()}
                      >
                        {column.render("Header")}
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
                      {column.render("Filter")}
                    </th>
                  );
                })}
                <th scope="column">{t("Action")}</th>
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            const { key, ...otherRowProps } = row.getRowProps();
            return (
              <tr key={key} {...otherRowProps}>
                <th scope="row">{index + 1}</th>
                {row.cells.map((cell) => {
                  console.log(cell.value);
                  const { key, ...otherCellProps } = cell.getCellProps();
                  return (
                    <td
                      key={key}
                      {...otherCellProps}
                      className="overflow-x-clip"
                      style={{
                        padding: "10px",
                        maxWidth: "7rem",
                        border: "solid 1px gray",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <CustomRender
                        value={cell.value}
                        type={schemaPropertiesRef.current[cell.column.id].type}
                      />
                    </td>
                  );
                })}
                <th scope="row" className='flex flex-row w-80'>
                  <div>
                  <NormalButton
                    dataId={data[0]._id}
                    className="h-4/5"
                    onClick={(event) => {
                      // console.log(event.currentTarget)

                      const self = event.currentTarget;
                      deleteDocuments(realmApp.currentUser, schemaType, {
                        _id: fieldConvert(
                          self.dataset.id,
                          schemaPropertiesRef.current["_id"].type
                        ),
                      })
                        .then(() => {
                          router.refresh();
                        })
                        .catch((error) => {
                          throw error;
                        });
                    }}
                    disabled={!deleteEnabled}
                  >
                    {t("Delete")}
                    <FaReacteurope />
                  </NormalButton>
                  </div>
                  <div>
                  <NormalButton className="h-4/5" onClick={() => {}}>
                    <EditIcon />
                  </NormalButton>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

 /* <div className='w-full space-x-1 p-4 border'> 

         <ConfirmDialog lng={"en"} confirmAction={function (): boolean {
          alert("confirm")
        } } closeAction={function (): Promise<boolean> {
          alert("closed")
          
        } } /> 
 </div> */