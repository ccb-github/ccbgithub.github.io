"use client"
import React, { useState, useEffect } from "react"
import { useApp } from "#/hooks/useApp"
import { BSON } from "realm-web"
import SchemaDataReactTable from "./SchemaDataReactTable"
import { normalSchemaMap } from "#/lib/schema"
import { ProductSchema } from "#/lib/schema/def/product"
import { URL_TO_SCHEMANAME } from "#/lib/schema/format"


type X = typeof URL_TO_SCHEMANAME
interface MongodbListProps {
  type: keyof typeof URL_TO_SCHEMANAME
  id?: string
  filter?: Realm.Services.MongoDB.Filter
  lng: string
  sortOption?: unknown
}
//TODO default value with name
/** filter: filterProps,
 * Description
 * @description Display data base on given  {@link MongodbList#SchemaName}
 * Search by filter, given param id will filter._id
 * @date 2023-03-29
 * @deprecated This should not be used
 * @param {SchemaName} type : schema name(Like table name in sql)
 * @param {any} filter
 * @param {string} id: The objectid(primary key) string
 * @param {string} lng: Language string, etc: ch, en
 * @returns {SchemaObject}
 */
export default function MongodbList({
  type,
  id,
  lng,
  sortOption: sortOptionProps,
}: MongodbListProps) {
  //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
  const schemaType = URL_TO_SCHEMANAME[type]
  const [filter] = useState({})
  //Table head
  const [sortOption] = useState(sortOptionProps || {})
  const [datas, setDatas] = useState<ProductSchema[]>([])
  const mongodbApp = useApp()
  useEffect(() => {
    if (mongodbApp?.currentUser) {
      const mongoClient = mongodbApp.currentUser?.mongoClient("mongodb-atlas")
      const mongoCollection = mongoClient
        .db("qrcodeTraceability")
        .collection(schemaType)
      id &&
        Object.defineProperty(filter, "_id", {
          writable: true,
          enumerable: true,
          value: new BSON.ObjectId(),
        })

      // mongoCollection.updateMany({}, { $set: {
      //   name: `Checker ${Math.random().toFixed(3).slice(1)}`
      // }}).then( res => console.log(res))
      mongoCollection
        .find(filter, { sort: sortOption })
        .then((foundDatas) => {
          setDatas((_currentDatas: any[]) => [...foundDatas])
        })
        .catch((error) => {
          console.error(error)
          throw error
        })
    }
  }, [filter])

  // if(id){
  //   return <ProductItem lng={lng} product={datas[0]}/>
  // }

  return (
    <div id="data-table" className="h-full w-full">
      <SchemaDataReactTable
        data={datas}
        lng={lng}
        schemaType={schemaType}
        deleteEnabled={false}
      />
    </div>
  )
}

// function useTable(arg0: { columns: { Header: string; accessor: string; }[]; data: { col1: string; col2: string; }[]; }): { getTableProps: any; getTableBodyProps: any; headerGroups: any; rows: any; prepareRow: any; } {
//   throw new Error('Function not implemented.');
// }
