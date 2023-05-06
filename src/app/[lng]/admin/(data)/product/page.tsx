'use client'
import { getAllProducts } from "#/components/ApolloEndpoint";
import { AppContext } from "#/components/AppProvider";
import ReactTable from "#/components/common/ReactTable";
import ConfirmDialog from "#/components/common/dialog/ConfirmDialog";
import { useApp } from "#/hooks/useApp";
import { schemaJson } from "#/lib/constants";
import { useTranslation } from "#/lib/i18n";
import { adminSettings } from "#/lib/webcontents/sideBar";
import { BasePageProps } from "#/types/page";
import { SchemaResultMapper } from "#/types/schema";
import { useContext, useEffect, useState } from "react";

import { BSON } from "realm-web";
import { errorMonitor } from "stream";

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

export default function AdminEnterpriseManagePage({params: {lng}}: BasePageProps) {
    //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
    // const { products } = await getAllProducts()
    // console.log(products)
    //const appContext = useContext(AppContext)
    //const {useCollection} = appContext
    const realmApp = useApp()
    const [confirmDialog, setConfirmDialog] = useState(false) 
    const [datas, setDatas] = useState<SchemaResultMapper["Product"]>([])
    useEffect(() => {
      //console.log("Product collection",productCollection)
      realmApp.currentUser?.mongoClient('mongodb-atlas').db("qrcodeTraceability").collection("Product")?.find()
        .then( results => setDatas(results))
        .catch( error => {
          throw Error(error)
      })
    } ,[])

    return (
      <div
        id="data-table"
        className="h-full w-full overflow-x-scroll overflow-y-scroll"
      >
        <ReactTable data={datas}  schemaType={"Product"} deleteEnabled={true}/>
      </div>
    );
  }



