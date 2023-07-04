import DateInputFieldTemplate from "#/components/common/input/DateInputFieldTemplate";
import { StringInputFieldTemplate } from "#/components/form/AddDataForm";
import { getCookieByName } from "#/components/util/cookie";
import { addCategory, getCatgories } from "#/lib/api/apolloEndpoint";
import { schemaJson } from "#/lib/schema";
import { getCategories } from "#/lib/getCategories";
import { useTranslation } from "#/lib/i18n";
import { BasePageProps } from "#/types/page";
import { BSON } from "realm-web";



export default async function Page({ params:{lng} }: BasePageProps) {
  const { t } = await useTranslation(lng, "common")
  const accessToken = getCookieByName("accessToken")
  const { catgories } = await getCatgories(accessToken!)
  // async function submitOtherData(data){
  //   "use server";
  //   const tempName = 'New cat' 
  //   console.log(data)
  // }
  async function submitData(data: FormData){
    "use server";
  
    // if((catgories as any[]).map( item => item.name ).includes(tempName)){
    //   console.log(t("The catgory already exists"))
    //   return 
    // }
    const result =  await addCategory({
      _id: new BSON.ObjectId(),
      name: data.get("name"),
      description: data.get("description"),
      createdAt:  data.get("createdAt")
    })
    console.log("Add result",result)
    return result
  }
//   if(Object.keys(searchParams).length === 0){ 
//     console.log("Enter search params branch");
//    (async () => {
//     const tempName = 'New cat' 
//     if((catgories as any[]).map( item => item.name ).includes(tempName)){
//       console.log(t("The catgory already exists"))
//       return 
//     }
//     const result =  await addCategory(accessToken!, {
//       name: `Test ${Math.random()}`,
//       description: "Test from function ${}",
//       _id: new BSON.ObjectId(),
//       createdAt: new Date()
//     })
//     console.log(result)
//   })()
// }
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
        {...schemaJson["Category"].properties["name"]}
        name={t("name", { ns: "Category" })}
      />
      <StringInputFieldTemplate
        {...schemaJson["Category"].properties["description"]}
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
  );
}



