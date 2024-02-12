import DateInputFieldTemplate from "#/components/common/input/DateInputFieldTemplate"
import { StringInputFieldTemplate } from "#/components/form/input/StringInputFieldTemplate"

import { normalSchemaMap } from "#/lib/schema"
import { useTranslation } from "#/lib/i18n"
import { BasePageProps } from "#/types/pageProp"
import { BSON } from "realm-web"
import { insertCategory } from "#/lib/api/gql/category"

export default async function Page({ params: { lng } }: BasePageProps) {
  const { t } = await useTranslation(lng, "common")

  async function submitData(data: FormData) {
    "use server"
    // if((categories).map( item => item.name ).includes(data.get("name") as string)){
    //   console.log(t("The same category name already exists"))
    //   return
    // }
    console.log(data.get("selectHelper"))
    const result = await insertCategory({
      _id: new BSON.ObjectId(),
      name: data.get("name") as string,
      description: data.get("description") as string,
      createdAt: new Date(data.get("createdAt") as unknown as Date),
    })
    console.log("Add result", result)
    return result
  }

  return (
    <form
      method="post"
      action={submitData}
      id="insertForm"
      className="
        h-full overflow-y-scrol pt-2 
        grid grid-cols-1 lg:grid-cols-2
      "
    >
      <h2 className="col-span-1 lg:col-span-2">
        {t("The category you want to add")}
      </h2>

      {/*<div className="form-group">
        <div className="w-full p-4">
          <label className=" control-label" htmlFor="">
            {"products"}
          </label>
          <TypeSpan text="related-item" className="float-right" />
        </div>
        <div className=" w-full">
          <AsyncSelect
            loadFunction={queryProducts}
            selectName={"products"}
            asyncLoadOptions={async () => {
              "use server"
              const products = await queryProducts()
              return products.map((product: { _id: string }) => ({
                label: product._id,
                value: product._id,
                color: "blue",
              }))
            }}
          />
        </div>
      </div> */}
      <StringInputFieldTemplate
        {...normalSchemaMap["Category"].properties["name"]}
        name={t("name", { ns: "category" })}
      />
      <StringInputFieldTemplate
        {...normalSchemaMap["Category"].properties["description"]}
        name={t("description")}
      />
      <DateInputFieldTemplate
        optional={false}
        dataType={"date"}
        indexed={false}
        mapTo={""}
        name={t("createAt")}
      />
      <div className="form-group col-span-1 lg:col-span-2">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
