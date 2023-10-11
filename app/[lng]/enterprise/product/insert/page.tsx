"use client"
import AddDataForm from "#/components/form/AddDataForm"
import { schemaJson } from "#/lib/schema"
import { BasePageProps } from "#/types/pageProp"

export default function Page({ params }: BasePageProps) {
  const { lng } = params

  return (
    <AddDataForm
      lng={lng}
      schemaObj={schemaJson["Product"]}
      schemaName={"Product"}
    />
  )
}
