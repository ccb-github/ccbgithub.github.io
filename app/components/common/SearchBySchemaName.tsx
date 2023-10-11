"use client"

import { SearchIcon } from "../icons"
import { useRef } from "react"
import { useApp } from "#/hooks/useApp"

import {
  SchemaResultMapper,
  SchemaName,
  SearchResultMap,
  NormalSchemaName,
} from "#/types/schema"
import { schemaJson } from "#/lib/schema"
import ReactSelect from "react-select"
import { useTranslation } from "#/lib/i18n/client"

export default function SearchBySchemaName({
  className,
  placeHolder,
  onSearchSubmit,
}: {
  className?: string
  searchSchemaName: SchemaName
  placeHolder?: string
  onSearchSubmit: (searchResult: SearchResultMap) => any
}) {
  const mongoApp = useApp()
  const { t } = useTranslation("dialog")
  //Current search schema name
  const searchSchemaRef = useRef<NormalSchemaName>()
  //TODO empty string
  const searchQueryRef = useRef("")
  const collectionRef = useRef<
    Realm.Services.MongoDB.MongoDBCollection<any> | undefined
  >()
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
    filter[field] = value

    const resultMap = new Map<
      string,
      | SchemaName
      | SchemaResultMapper[Exclude<typeof searchSchemaRef.current, undefined>]
    >([
      ["type", searchSchemaRef.current],
      ["resultData", await collectionRef.current?.findOne(filter)],
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
        options={Object.entries(schemaJson).map((schemaEntry) => ({
          name: schemaEntry[1].name,
          label: schemaEntry[1].name,
        }))}
        onChange={(value) => {
          searchSchemaRef.current = value?.name
          collectionRef.current = mongoApp.currentUser
            ?.mongoClient("mongodb-atlas")
            .db("qrcodeTraceability")
            .collection(value!.name)
        }}
      />
      <input
        type="text"
        className="rounded-md"
        required
        placeholder={placeHolder || "Searchbar placeholder not set"}
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
