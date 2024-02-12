"use client"
import AddDataForm from "#/components/form/AddDataForm"
import { normalSchemaMap } from "#/lib/schema"
import { BasePageProps } from "#/types/pageProp"

export default function Page({ params }: BasePageProps) {
  const { lng } = params
  return (
    <AddDataForm
      lng={lng}
      schemaName={"Product"}
      schemaObj={normalSchemaMap["Product"]}
    >
      {/* <AsyncSelect asyncLoadOptions={}/> */}
    </AddDataForm>
  )
}
