import AddDataForm from "#/components/form/AddDataForm"
import { schemaJson } from "#/lib/schema"
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

  // <AddDataForm schemaObj={schemaJson[toSchemaTypestring(type)]}/>
  console.log("Page Enterprise")
  return (
    <AddDataForm
      lng={lng}
      schemaObj={schemaJson["Enterprise"]}
      schemaName={"Enterprise"}
    />
  )
}
