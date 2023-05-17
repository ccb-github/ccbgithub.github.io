import { useApp } from "#/hooks/useApp"
import { SchemaName } from "#/types/schema"
import { useEffect, useRef, useState } from "react"
//The id must can be stringify
export default function RelatedObjectSelect({ objectType, name, label, ...props }:{
	objectType: SchemaName,
  name: string,
  label?: string,
	linked?: boolean,
  onChangeValue?: (newValue: string) => any
}){
  //TODO provide the type
  const [dataList, setDataList] = useState<any []>([])
  const targetItems = useRef([])
  const mongoApp = useApp()
  const mongoCol = useRef(mongoApp.currentUser?.mongoClient('mongodb-atlas')
    .db('qrcodeTraceability')
    .collection(objectType)
  )
  useEffect(() => {
	  mongoCol.current?.find({}).then( res => setDataList(res))
  }, [objectType])
  
  return (
    <select name={name} {...props}  
      defaultValue={label || `Select the related ${objectType} item id`}>
      {/* <option key={"default"} value={""}>
       {`Select the related ${objectType} item id`}
      </option> */}
      {dataList !== undefined
        ? dataList.map((item, key) => {
            return (
              <option key={key} value={item._id.toString()}>
                {item.name || item._id.toString()}
              </option>
            )
          })
        : null}
    </select>
  )
}