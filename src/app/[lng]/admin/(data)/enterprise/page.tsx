'use client'
import ReactTable from "#/components/common/ReactTable";
import { useApp } from "#/hooks/useApp";
import { schemaJson } from "#/lib/constants";
import { useTranslation } from "#/lib/i18n";
import { adminSettings } from "#/lib/webcontents/sideBar";
import { BasePageProps } from "#/types/page";
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

export default function AdminEnterpriseManagePage({params: {lng}}: BasePageProps) {
    //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
    const schemaType = "Enterprise"
    const [filter] = useState({})
    const schemaPropertiesRef = useRef(schemaJson[schemaType].properties); 
    //Table head 
    const tableHeadRef = useRef(
      Object.keys(schemaPropertiesRef.current).map(
        (property) => schemaPropertiesRef.current[property].name
      ).sort()
    );
   
    
    //TODO type
    const [datas, setDatas] = useState<any[]>([]);
    const mongodbApp = useApp();
    useEffect(() => {
      if (mongodbApp?.currentUser) {
        const mongoClient = mongodbApp.currentUser?.mongoClient('mongodb-atlas');
        const mongoCollection = mongoClient.db('qrcodeTraceability').collection(schemaType);
        Object.defineProperty(filter, "_id",  {
          writable: true,
          enumerable: true,
          value: new BSON.ObjectId(),
        }) 
        
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
  
  
    
    
    const updateItem = async (e: Event) => {
      e.preventDefault()
          
      let beforeData, afterData
      const mongoCollection = mongodbApp
        ?.currentUser
        ?.mongoClient('mongodb-atlas')
        .db('qrcodeTraceability')
        .collection(schemaType);
      //@ts-ignore
      await mongoCollection?.updateOne({_id: beforeData._id},afterData)
    }
    const deleteItem = async (id: string) => {
      console.log(mongodbApp?.currentUser?.id)
      
      if(confirm("Are you sure you want to delete it")) {
        const mongoCollection = mongodbApp
          ?.currentUser
          ?.mongoClient('mongodb-atlas')
          .db('qrcodeTraceability')
          .collection(schemaType);
        //@ts-ignore
        mongoCollection?.deleteOne({_id: BSON.ObjectId(id)})
          .then( result => alert(result))
          .catch(
            error => console.error(error)	
          )
      }
    }
    
    // if(id){
    //   return <ProductItem lng={lng} product={datas[0]}/>
    // } 
    
    return (
      <div
        id="data-table"
        className="h-full w-full overflow-x-scroll overflow-y-scroll"
      >
        <ReactTable data={datas}  schemaType={schemaType}/>
      </div>
    );
  }



