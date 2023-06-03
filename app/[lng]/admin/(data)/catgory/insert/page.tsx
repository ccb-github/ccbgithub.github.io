import DateInputFieldTemplate from "#/components/common/input/DateInputFieldTemplate";
import { StringInputFieldTemplate } from "#/components/form/AddDataForm";
import { getCookieByName } from "#/components/util/cookie";
import { addCategory, getCatgories } from "#/lib/api/apolloEndpoint";
import { schemaJson } from "#/lib/constants";
import { getCategories } from "#/lib/getCategories";
import { useTranslation } from "#/lib/i18n";
import { BasePageProps } from "#/types/page";
import { BSON } from "realm-web";

function TypeSign({
  text,
  children,
  className
}: {
  text: string,
  children?: React.ReactNode;
  className?: string
}) {
  return (
    <span
      className={`
        inline-flex space-x-2 rounded-lg bg-gray-700 
        px-3 py-1 text-sm font-medium cursor-default
      text-gray-100 hover:bg-gray-500 hover:text-white
        ${className || ''}
      `}>
      {text}
      {children}
      {/* <ArrowRightIcon className="block w-4" /> */}
    </span>
  );
};
console.log("This page loaded")
export default async function Page({ params:{lng} }: BasePageProps) {
  const { t } = await useTranslation(lng)
  const accessToken = getCookieByName("accessToken")
  const { catgories } = await getCatgories(accessToken!)
  async function submitOtherData(data){
    "use server";
    const tempName = 'New cat' 
    console.log(data)
  }
  async function submitData(data){
    "use server";
    const tempName = 'New cat' 
    console.log(data)
    // if((catgories as any[]).map( item => item.name ).includes(tempName)){
    //   console.log(t("The catgory already exists"))
    //   return 
    // }
    const result =  await addCategory({
      name: `Test ${Math.random()}`,
      description: "Test from function ${}",
      _id: new BSON.ObjectId(),
      createdAt: new Date()
    })
    console.log("Result",result)
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
        h-full overflow-y-scrol pt-2 grid 
        grid-cols-1 lg:grid-cols-2
      "
    >
      <h2 className="col-span-1 lg:col-span-2">Enter the catgory you want add</h2>
  
      <StringInputFieldTemplate {...schemaJson["Catgory"].properties["name"]}/>
      <StringInputFieldTemplate {...schemaJson["Catgory"].properties["description"]}/>
      <DateInputFieldTemplate 
        name="createAt" optional={false} 
        type={"date"} indexed={false} mapTo={""}
      />
      <div className="form-group col-span-1 lg:col-span-2">
        <button type="submit">Submit</button>
      </div>
    </form>


  )
}


