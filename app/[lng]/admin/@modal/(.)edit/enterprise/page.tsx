import Button from "#/components/common/Button"

import { templateHTML } from "#/components/form/templateHTML"

import { getEnterpriseById, updateEnterprise } from "#/lib/api/gql/enterprise"
import { normalSchemaJson } from "#/lib/schema"
import { BasePageProps } from "#/types/pageProp"
import Script from "next/script"
import { BSON } from "realm-web"
 
//TODO optimize layout grid cell max size
export default async function EnterpriseEditPage({
  searchParams,
}: BasePageProps) {
  const schemaObj = normalSchemaJson["Enterprise"]

  const { id } = searchParams
  const { enterprise } = await getEnterpriseById(id as string)
  async function editEnterpriseSubmit(editedEnterpriseData: FormData) {
    console.log(
      `The setdata in enterprise form ${editedEnterpriseData.entries()}`
    )
    const setData = {
      address: editedEnterpriseData.get("address"),
      creditCode: editedEnterpriseData.get("creditCode"),
      createdAt: editedEnterpriseData.get("createdAt")
        ? new Date(editedEnterpriseData.get("createdAt") as string)
        : undefined,
    }
    try {
      const result = await updateEnterprise({
        query: { _id: new BSON.ObjectId(id as string) },
        set: setData,
      })
      console.log(
        `The update result for enterprise with id ${id} ${JSON.stringify(
          result,
        )}`,
      )
    } catch (error) {
      console.error(error)
    }
  }
 
  return (
    <>
      <dialog id={"editEnterpriseDialog"}>
        <form
          method="dialog"
          action={editEnterpriseSubmit}
          id="insertForm"
          className={`
            grid grid-cols-1 gap-5 lg:grid-cols-2 
            h-full overflow-y-scroll pt-2
        `}
        >
          {Object.keys(schemaObj.properties).map((e) =>
            templateHTML({
              ...schemaObj.properties[e],
              defaultValue: enterprise[e],
            }),
          )}

          {/* <RelatedItemDialog itemType='Product'/> */}
          <div className="form-group lg:col-span-2">
            <Button type="reset" className="m-2">
              Reset
            </Button>
            {/* <Button type="reset" className="m-2">
              Save
            </Button> */}
            <Button type="submit" className="m-2">
              Submit
            </Button>
          </div>
        </form>
      </dialog>
      <Script id={"loadDialog"} strategy="afterInteractive">
        {`console.log('loadDialog script')
          debugger
          window.editEnterpriseDialog.showModal()
        `}
      </Script>
    </>
  )
}
