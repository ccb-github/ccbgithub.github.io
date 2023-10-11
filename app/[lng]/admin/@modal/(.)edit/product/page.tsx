import Button from "#/components/common/Button"
import { templateHTML } from "#/components/form/templateHTML"
import { getOneProduct, updateOneProduct } from "#/lib/api/apolloService"
import { useTranslation } from "#/lib/i18n"
import { schemaJson } from "#/lib/schema"
import { BasePageProps } from "#/types/pageProp"
import { SchemaResultMapper } from "#/types/schema"

import Script from "next/script"
import { BSON } from "realm-web"

export default async function ProductEditPage({
  params: { lng },
  searchParams,
}: BasePageProps) {
  console.log("This Product editpage ([admin/@modal/.edit/product) is rendered")
  const schemaObj = schemaJson["Product"]
  const { id } = searchParams
  const { t } = await useTranslation(lng)
  const { product } = await getOneProduct({
    query: {
      _id: new BSON.ObjectId(id as string),
    },
  })
  console.log(product)
  const editProductSubmit = async (editedProductData: FormData) => {
    "use server"
    let setData = Object.create({})
    console.log(`The setdata in enterprise form ${editedProductData.entries()}`)

    setData = {
      address: editedProductData.get("address"),
      creditCode: editedProductData.get("creditCode"),
      createdAt: editedProductData.get("createdAt")
        ? new Date(editedProductData.get("createdAt") as string)
        : undefined,
    }
    try {
      const result = await updateOneProduct({
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
      <dialog id={"editProductDialog"}>
        <form
          method="post"
          action={editProductSubmit}
          id="insertForm"
          className={`
            grid grid-cols-1 gap-5 lg:grid-cols-2 
            h-full overflow-y-scroll pt-2
          `}
        >
          {Object.keys(schemaObj.properties).map((e) =>
            templateHTML({
              ...schemaObj.properties[e],
              defaultValue: product[e as keyof SchemaResultMapper["Product"]],
            }),
          )}

          {/* <RelatedItemDialog itemType='Product'/> */}
          <div className="form-group lg:col-span-2">
            <Button type="reset" className="m-2">
              {t("Reset")}
            </Button>
            <Button type="reset" className="m-2" disabled>
              Save
            </Button>
            <Button type="submit" className="m-2">
              Submit
            </Button>
          </div>
        </form>
      </dialog>
      <Script id={"loadDialog"}>
        {`
        window.editProductDialog.showModal()
      `}
      </Script>
    </>
  )
}
