StringInputFieldTemplate
import Button from "#/components/common/Button"
import { StringInputFieldTemplate } from "#/components/form/input/StringInputFieldTemplate"
import { getAllRegulatory, updateRegulatories } from "#/lib/api/gql/regulatory"
import { normalSchemaMap } from "#/lib/schema"
import { BasePageProps } from "#/types/pageProp"
import Script from "next/script"

import { BSON } from "realm-web"

export default async function AdminRegulatoryEditPage({
  searchParams,
}: BasePageProps) {
  console.log("This Product editpage (.) is rendered")
  const schemaObj = normalSchemaMap["Regulatory"]
  const { id } = searchParams
  const { regulatories } = await getAllRegulatory({
    query: { _id: new BSON.ObjectId(id as string) },
  })
  console.log(regulatories[0])
  const formSubmit = async (editedData: FormData) => {
    "use server"
    const result = await updateRegulatories({
      query: {
        _id: new BSON.ObjectId(id as string),
      },
      set: {
        name: editedData.get("name") as string,
        description: editedData.get("description") as string,
        address: editedData.get("address") as string,
      },
    })

    console.log("edit result", result)
    return result
  }
  return (
    <>
      <dialog id={"editRegulatoryDialog"}>
        <form
          method="dialog"
          action={formSubmit}
          id="insertForm"
          className={`
            grid grid-cols-1 gap-5 lg:grid-cols-2 
            h-full overflow-y-scroll pt-2
          `}
        >
          <StringInputFieldTemplate
            {...schemaObj.properties["name"]}
            defaultValue={regulatories[0].name}
          />
          <StringInputFieldTemplate
            {...schemaObj.properties["description"]}
            defaultValue={regulatories[0].description}
          />
          <StringInputFieldTemplate
            {...schemaObj.properties["address"]}
            defaultValue={regulatories[0].address}
          />
          {/* <RelatedItemDialog itemType='Product'/> */}
          <div className="form-group lg:col-span-2">
            <Button type="reset" className="m-2">
              Reset
            </Button>
            <Button type="reset" className="m-2">
              Save
            </Button>
            <Button type="submit" className="m-2">
              Submit
            </Button>
          </div>
        </form>
      </dialog>
      <Script id={"loadEditRegulatoryDialog"} strategy="afterInteractive">
        {`
        console.log("The load edit regulatory dialog executed")
          window.editRegulatoryDialog.showModal()
        `}
      </Script>
    </>
  )
}
