import MongodbList from "#/components/common/MongodbList";
import ReactTable from "#/components/common/ReactTable";
import { getByNameAndFilter, getCatgories, getOneProduct } from "#/lib/api/apolloEndpoint";
import { useTranslation } from "#/lib/i18n";
import { BasePageProps } from "#/types/page";
import { cookies } from "next/headers";


export default async function AdminEnterpriseManagePage({params: {lng}}: BasePageProps) {
  //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
 
  const cookieStore = cookies()

  const accessToken = cookieStore.get('accessToken')
 
  //const product = {"name": "Product one"}
  const {catgories} = await getCatgories(accessToken!.value)
  console.log(catgories)
  return (
    <div
      id="data-table"
      className="h-full w-full"
    >
      <ReactTable data={catgories} columnList={["name", "description"]}
      schemaType={"Category"} deleteEnabled={true} lng={lng}/>
    </div>
  );
}



