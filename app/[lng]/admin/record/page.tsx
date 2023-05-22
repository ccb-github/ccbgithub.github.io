
import { getAllProducts } from "#/lib/api/ApolloEndpoint";
import ReactTable from "#/components/common/ReactTable";
import { useApp } from "#/hooks/useApp";
import { schemaJson } from "#/lib/constants";
import { useTranslation } from "#/lib/i18n";
import { adminSettings } from "#/lib/webcontents/sideBar";
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

export default async function CheckerRecord({params: {lng}}: BasePageProps) {
    //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
    // const { products } = await getAllProducts()
    // console.log(products)
    return (
      <div
        id="data-table"
        className="h-full w-full overflow-x-scroll overflow-y-scroll"
      >
        <ReactTable data={[]}  schemaType={"Product"}/>
      </div>
    );
  }



