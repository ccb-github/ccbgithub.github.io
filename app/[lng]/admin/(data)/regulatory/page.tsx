'use client'
import ReactTable from "#/components/common/ReactTable";
import { useApp } from "#/hooks/useApp";
import { schemaJson } from "#/lib/schema";
import { BasePageProps } from "#/types/page";
import { SchemaResultMapper } from "#/types/schema";
import { useEffect, useRef, useState } from "react";



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
    const [datas, setDatas] = useState<SchemaResultMapper["Regulatory"][]>([]);
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
        <ReactTable
          data={datas}
          schemaType={schemaType}
          deleteEnabled={true}
          columnList={["address", "name", "_id"]}
          lng={lng}
        />
      </div>
    );
  }