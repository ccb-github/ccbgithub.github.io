import DateInputFieldTemplate from "#/components/common/input/DateInputFieldTemplate"
import { StringInputFieldTemplate } from "#/components/form/input/StringInputFieldTemplate"
import { insertCheckRecord } from "#/lib/api/gql/checkRecord"
import { useTranslation } from "#/lib/i18n"
import { normalSchemaMap } from "#/lib/schema"
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
    const result = await insertCheckRecord({
      _id: new BSON.ObjectId(),
      name: data.get("name") as string,
      result: data.get("result") as string,
      device: new BSON.ObjectId(data.get("device") as string),
      method: data.get("method") as string,
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
      <h2 className="col-span-1 lg:col-span-2">{t("New check record")}</h2>

      <StringInputFieldTemplate
        {...normalSchemaMap["CheckRecord"].properties["name"]}
        name={t("name", { ns: "checkRecord" })}
      />
      <StringInputFieldTemplate
        {...normalSchemaMap["CheckRecord"].properties["description"]}
        name={t("description")}
      />
      <StringInputFieldTemplate
        {...normalSchemaMap["CheckRecord"].properties["result"]}
        name={t("result")}
      />
      <StringInputFieldTemplate
        {...normalSchemaMap["CheckRecord"].properties["device"]}
        name={t("device")}
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
