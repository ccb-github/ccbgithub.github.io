import Button from "#/components/common/Button"
import { templateHTML } from "#/components/form/templateHTML"
import { queryProductById, updateProducts } from "#/lib/api/gql/product"

import { useTranslation } from "#/lib/i18n"
import { SchemaTypeMapper, normalSchemaMap } from "#/lib/schema"
import { ProductSchema } from "#/lib/schema/def/product"
import { BasePageProps } from "#/types/pageProp"
import Script from "next/script"
import { BSON } from "realm-web"

export default async function ProductEditPage({
  params: { lng },
  searchParams,
}: BasePageProps) {
  console.log("This Product editpage ([admin/@modal/.edit/product) is rendered")
  const schemaObj = normalSchemaMap["Product"]
  const { id } = searchParams
  const { t } = await useTranslation(lng)
  const { product } = await queryProductById({
    _id: id as string,
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
      const result = await updateProducts({
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
          {(
            Object.keys(schemaObj.properties) as Array<keyof ProductSchema>
          ).map((e) =>
            templateHTML({
              //@ts-ignore
              ...schemaObj.properties[e],
              defaultValue: product[e as keyof SchemaTypeMapper["Product"]],
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
