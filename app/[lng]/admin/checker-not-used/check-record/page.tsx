import DateInputFieldTemplate from "#/components/common/input/DateInputFieldTemplate"
import { StringInputFieldTemplate } from "#/components/form/input/StringInputFieldTemplate"
import { addCategory } from "#/lib/api/apolloService"
import { useTranslation } from "#/lib/i18n"
import { normalSchemaJson } from "#/lib/schema"
import { BasePageProps } from "#/types/pageProp"
import { BSON } from "realm-web"

export default async function Page({ params: { lng } }: BasePageProps) {
  const { t } = await useTranslation(lng, "common")

  async function submitData(data: FormData) {
    "use server"

    // if((catgories as any[]).map( item => item.name ).includes(tempName)){
    //   console.log(t("The catgory already exists"))
    //   return
    // }
    const result = await addCategory({
      _id: new BSON.ObjectId(),
      name: data.get("name") as string,
      description: data.get("description") as string,
      createdAt: data.get("createdAt")!,
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

      <StringInputFieldTemplate
        {...normalSchemaJson["Category"].properties["name"]}
        name={t("name", { ns: "Category" })}
      />
      <StringInputFieldTemplate
        {...normalSchemaJson["Category"].properties["description"]}
        name={t("description")}
      />
      <DateInputFieldTemplate
        optional={false}
        type={"date"}
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
