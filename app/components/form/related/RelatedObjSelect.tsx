"use client"
import { useApp } from "#/hooks/useApp"
import { NormalSchemaName, SchemaResultMapper } from "#/types/schema"
import { useEffect, useRef, useState } from "react"
// TODO The id must can be stringify
export default function RelatedObjectSelect({
  objectType,
  name,
  displayKey = "name",
  label,
  className,
  ...props
}: {
  objectType: NormalSchemaName
  className?: string
  displayKey: keyof SchemaResultMapper[NormalSchemaName]
  name?: string
  label?: string
  linked?: boolean
  onChangeValue?: (newValue: string) => void
}) {
  //TODO provide the type
  const [dataList, setDataList] = useState<
    SchemaResultMapper[NormalSchemaName][]
  >([])
  const mongoApp = useApp()
  const mongoCol = useRef(
    mongoApp!.currentUser
      ?.mongoClient("mongodb-atlas")
      .db("qrcodeTraceability")
      .collection(objectType),
  )
  useEffect(() => {
    //Loading data
    mongoCol.current?.find({}).then((res) => {
      setDataList(res)
    })
  }, [])

  return (
    <select
      className={className}
      name={name}
      {...props}
      defaultValue={label || `Select the related ${objectType}`}
    >
      {dataList.map((item, key) => {
        return (
          <option key={key} value={item._id.toString()}>
            {item[displayKey]}
          </option>
        )
      })}
    </select>
  )
}