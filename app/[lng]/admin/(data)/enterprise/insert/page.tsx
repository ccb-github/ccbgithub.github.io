import AddDataForm from "#/components/form/AddDataForm"
import { normalSchemaMap } from "#/lib/schema"
import { BasePageProps } from "#/types/pageProp"

interface PagePropsWithTypeParams extends BasePageProps {
  params: {
    type: string
    lng: string
  }
}
export default function AdminInsertEnterprisePage({
  params,
}: PagePropsWithTypeParams) {
  const { lng } = params
  console.log("Page Enterprise")
  return (
    <AddDataForm
      lng={lng}
      schemaObj={normalSchemaMap["Enterprise"]}
      schemaName={"Enterprise"}
    />
  )
}
