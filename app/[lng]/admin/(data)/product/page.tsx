import ReactTable from "#/components/common/ReactTable";
import ConfirmDialog from "#/components/common/dialog/ConfirmDialog";
import { getAllProducts, getByName, getByNameAndFilter, getOneProduct } from "#/lib/api/apolloEndpoint";
import { BasePageProps } from "#/types/page";
import { SchemaResultMapper } from "#/types/schema";
import { cookies } from "next/headers";



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
        px-3 py-1 text-sm font-medium 
      text-gray-100 hover:bg-gray-500 hover:text-white
        ${className || ''}
      `}>
      {text}
      {children}
      {/* <ArrowRightIcon className="block w-4" /> */}
    </span>
  );
};

export default async function AdminEnterpriseManagePage({params: {lng}}: BasePageProps) {
    //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
   
    const cookieStore = cookies()
  
    const accessToken = cookieStore.get('accessToken')
    //const product = {"name": "Product one"}
    const {products} = await getAllProducts()
    console.log(products)
    return (
      <div
        id="data-table"
        className="h-full w-full"
      >
        <ReactTable data={products} columnList={["name", "assemblePlace"]} 
                    schemaType={"Product"} deleteEnabled={true}/>
      </div>
    );
  }



