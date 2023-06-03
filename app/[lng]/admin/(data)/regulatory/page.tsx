'use client'
import ReactTable from "#/components/common/ReactTable";
import { useApp } from "#/hooks/useApp";
import { schemaJson } from "#/lib/constants";
import { useTranslation } from "#/lib/i18n";
import { adminSettings } from "#/lib/webcontents/sideBar";
import { BasePageProps } from "#/types/page";
import { SchemaResultMapper } from "#/types/schema";
import { useEffect, useRef, useState } from "react";
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

export default function AdminRegulatoryManagePage({params: {lng}}: BasePageProps) {
    //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
    const schemaType = "Regulatory"
    const [filter] = useState({})
    const schemaPropertiesRef = useRef(schemaJson[schemaType].properties); 
    //Table head 
    const tableHeadRef = useRef(
      Object.keys(schemaPropertiesRef.current).map(
        (property) => schemaPropertiesRef.current[property].name
      ).sort()
    );
   
    
    //TODO type
    const [datas, setDatas] = useState<SchemaResultMapper[""][]>([]);
    const mongodbApp = useApp();
    useEffect(() => {
      if (mongodbApp?.currentUser) {
        const mongoClient = mongodbApp.currentUser?.mongoClient('mongodb-atlas');
        const mongoCollection = mongoClient.db('qrcodeTraceability').collection(schemaType);
        // Object.defineProperty(filter, "_id",  {
        //   writable: true,
        //   enumerable: true,
        //   value: new BSON.ObjectId(),
        // }) 
        
        // mongoCollection.updateMany({}, { $set: {
        //   name: `Checker ${Math.random().toFixed(3).slice(1)}`
        // }}).then( res => console.log(res))
        mongoCollection.find(filter)
          .then(
            foundDatas => {
              setDatas((_currentDatas: any[]) => [...foundDatas]);
            }
          )
          .catch( 
            error => {
              console.error(error) 
              throw error;
            }
          )
      }
      
    }, [filter]);
  
  
    
    

    
   
    
    return (
      <div
        id="data-table"
        className="h-full w-full overflow-x-scroll overflow-y-scroll"
      >
        <ReactTable data={datas} schemaType={schemaType} deleteEnabled={true} lng={lng}/>
      </div>
    );
  }