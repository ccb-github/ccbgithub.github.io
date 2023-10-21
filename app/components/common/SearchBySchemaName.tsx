"use client"

import { SearchIcon } from "../icons"
import { useMemo, useRef } from "react"
import { useApp } from "#/hooks/useApp"

import { normalSchemaJson } from "#/lib/schema"
import ReactSelect from "react-select"
import { useTranslation } from "#/lib/i18n/client"
import { NormalSchemaName } from "#/lib/schema/format"

export type SearchResultMap<SearchResult> = Map<
  string,
  SearchResult
>
export default function SearchBySchemaName({
  className,
  searchSchemaName: searchSchemaNameProp,
  placeHolder,
  onSearchSubmit,
}: {
  className?: string
  searchSchemaName: NormalSchemaName
  placeHolder?: string
  onSearchSubmit: (searchResult: unknown) => unknown
}) {
  const mongoApp = useApp()
  const { t } = useTranslation("dialog")
  //Current search schema name
  const searchSchemaRef = useRef<NormalSchemaName>()
  let searchSchema : NormalSchemaName = searchSchemaNameProp
  //const targetSchema = 
  //TODO empty string
  const searchQueryRef = useRef("")
  const collectionRef = useRef<
    Realm.Services.MongoDB.MongoDBCollection<any> | undefined
  >()
  const mongoCollection = useMemo(() => {
    return mongoApp.currentUser!.mongoClient("mongodb-atlas")
    .db(process.env.NEXT_PUBLIC_MONGODB_ATLAS_DATABASE!).collection(searchSchema)
  },[searchSchema]) 
  const onSubmit = async () => {
    if (searchSchemaRef.current === undefined) {
      alert(t("Please select the type first!"))
      return false
    }
    const filter = {}
    let field, value
    //query matching

    if (searchQueryRef.current.match(/:\s/)) {
      [field, value] = searchQueryRef.current.split(":")
      //Remove the space prefix, to do search with field:
      value = value.slice(1)
      console.log("Field and value:", { field, value })
    } else {
      field = "name"
      value = searchQueryRef.current
    }
    /**
     * @todo Unify the object define 
     */
    Object.defineProperty(filter, "field", {
      enumerable: true,
      value,
      writable: true
    })


    const resultMap = new Map<
      string,
      unknown
    >([
      ["type", searchSchemaRef.current],
      ["resultData", await mongoCollection?.findOne(filter)],
    ])
    
    
    onSearchSubmit(resultMap)
  }
  //Change the activate collection
  // useEffect(() => {
  //   collectionRef.current =
  //     mongoApp.currentUser?.mongoClient("mongodb-atlas")
  //       .db("qrcodeTraceability")
  //       .collection(searchSchemaRef.current)
  // }, [searchSchemaRef])
  return (
    <div className={`flex justify-center ${className ?? ""}`}>
      <ReactSelect
        inputId="select-container"
        options={Object.entries(normalSchemaJson).map((schemaEntry) => ({
          name: schemaEntry[1].name,
          label: schemaEntry[1].name,
        }))}
        onChange={(value) => {
          if(value === null) 
            return 
          searchSchema = value.name
          collectionRef.current = mongoApp.currentUser
            ?.mongoClient("mongodb-atlas")
            .db("qrcodeTraceability")
            .collection(value.name)
        }}
      />
      <input
        type="text"
        className="rounded-md"
        required
        placeholder={placeHolder || "SearchBar placeholder not set"}
        onChange={(searchQueryOnChangeEvent) =>
          (searchQueryRef.current =
            searchQueryOnChangeEvent.currentTarget.value)
        }
      />
      <button type="button" onClick={onSubmit}>
        <SearchIcon />
      </button>
    </div>
  )
}
