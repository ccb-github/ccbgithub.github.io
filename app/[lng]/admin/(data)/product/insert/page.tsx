"use client"
import AddDataForm from "#/components/form/AddDataForm"
import { schemaJson } from "#/lib/schema"
import { BasePageProps } from "#/types/pageProp"

export default function Page({ params }: BasePageProps) {
  const { lng } = params

  // <AddDataForm schemaObj={schemaJson[toSchemaTypestring(type)]}/>

  return (
    <AddDataForm
      lng={lng}
      schemaName={"Product"}
      schemaObj={schemaJson["Product"]}
    >
      {/* <AsyncSelect asyncLoadOptions={}/> */}
    </AddDataForm>
  )
}
