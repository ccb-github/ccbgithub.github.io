'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '#/hooks/useApp';
import DataItem from '#/components/normal/DataItem';

import type { SchemaObject } from '#/types/schema';
import { schemaJson } from '#/lib/constants'


import { BSON } from 'realm-web';
import { toSchemaTypestring } from '#/lib/stringFactory';
import { FaSort } from 'react-icons/fa';
import { useTable } from 'react-table'


interface MongodbListProps {
  type: string;
  id?: string;
  filter?: Realm.Services.MongoDB.Filter;
  lng: string;
  sortOption: any
}
//TODO default value with name
/** filter: filterProps,
 * Describ
 * Search by filter, given param id will filter._id
 * @date 2023-03-29
 * @param {any} type : schema name(Like table name in sql)
 * @param {any} filter 
 * @param {string} id: The objectid(primary key) string
 * @param {string} lng}: Language string, etc: ch, en
 * @returns {SchemaObject}
 */
export default function MongodbList({ type, id, lng, sortOption: sortOptionProps }: MongodbListProps) {
  const schemaType = toSchemaTypestring(type)
  const [filter, setFilter] = useState({})
  const schemaPropertiesRef = useRef(schemaJson[schemaType].properties); 
  //Table head 
  const tableHeadRef = useRef(
    Object.keys(schemaPropertiesRef.current).map(
      (property) => schemaPropertiesRef.current[property].name
    ).sort()
  );
  type FieldKey = typeof tableHeadRef.current[number]
  const schemaObj = useRef<SchemaObject>(schemaJson[schemaType]);
  
  const [sortOption, setSortOption] = useState(sortOptionProps || {})
  
  //TODO type
  const [datas, setDatas] = useState<any[]>([]);

  const data = React.useMemo(

    () => [

      {

        col1: 'Hello',

        col2: 'World',

      },

      {

        col1: 'react-table',

        col2: 'rocks',

      },

      {

        col1: 'whatever',

        col2: 'you want',

      },

    ],

    []

  )



  const columns = React.useMemo(

    () => [

      {

        Header: 'Column 1',

        accessor: 'col1', // accessor is the "key" in the data

      },

      {

        Header: 'Column 2',

        accessor: 'col2',

      },

    ],

    []

  )



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    rows,

    prepareRow,

  } = useTable({ columns, data })


  const mongodbApp = useApp();
  
  useEffect( () => {
    alert(JSON.stringify(filter))
  }, [filter])

  useEffect(() => {
    if (mongodbApp?.currentUser) {
      const mongoClient = mongodbApp.currentUser?.mongoClient('mongodb-atlas');
      const mongoCollection = mongoClient.db('qrcodeTraceability').collection(schemaType);
      id && ( Object.defineProperty(filter, "_id",  {
        writable: true,
        enumerable: true,
        value: new BSON.ObjectId(),
      }) )
      
      // mongoCollection.updateMany({}, { $set: {
      //   name: `Checker ${Math.random().toFixed(3).slice(1)}`
      // }}).then( res => console.log(res))
      mongoCollection.find(filter, {sort: sortOption}).then(
        (foundDatas) => {
           
          setDatas((_currentDatas: any[]) => [...foundDatas]);
      })
      .catch( 
        error => {
          console.error(error) 
          throw error;
        }
      )
    }
    
  }, [filter]);

  async function submitProfileChange() {
    mongodbApp?.currentUser?.refreshCustomData()  
  }
  
  
  
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
     {/* <table>
      <tr>
      <td><strong>2</strong></td>
      <td><strong>2</strong></td>
          <td><strong>2</strong></td>
        </tr>
        <tr>
          <td>Name <select><option>Default</option></select></td>
          <td>Name{<ExternalLink href={'#'}>Exte<strong>foo</strong></ExternalLink>}{<ExternalLink href={'#'}>Exte<strong>foo</strong></ExternalLink>}</td>
        </tr>
      </table> */}
		// $(e.target.parentNode.parentNode).find('td.value-cell')
		// 		.attr('contenteditable', 'true').each(
		// 			(index, element)=>{
		// 				$(element).addClass('table-active')
		// 				valueBefore[element.id] = element.innerText
		// 			}
		// 		);
  };
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
      <table className="bg-azure table rounded">
        <thead>
          <tr>
            <th>
            {/* <NormalButton onClick={() => {
              setFilter( (preFilter: { [x: string]: string; }) => {
                preFilter["name"] = "Product a"
                return {...preFilter, ...{name: "Product a"}}
              })
            }}>Change</NormalButton> */}
            </th>
            {tableHeadRef.current.map((fieldKey: string, index: number) => (
              <th scope="col" key={index}>
                {fieldKey}
                <FaSort/>
                {
                  <select
                    onChange={(e) => {
                      setFilter((preFilter: {[key : FieldKey]: string}) => {
                        preFilter[fieldKey] = e.target.value
                        return preFilter
                    })}}
                  >
                    {[...new Set(datas.map((data) => data[fieldKey]))].map(
                      (item, index: number) => (
                        /* TODO many other data type */
                        <option key={index} value={item}>
                          {typeof item === "object" ? item.toString() : item}
                        </option>
                      )
                    )}
                  </select>
                }
                {/* <span
                  className="ml-4"
                  onClick={() => {
                    setSortOption((preSortMap: any) => {
                      preSortMap[item] = -1
                    })
                  }}
                >
                  {sortOption[item] ? sortOption[item] : 0}
                </span> */}
              </th>
            ))}
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {datas.length !== 0 ? (
            datas.map((data: any, index: number) => (
              <DataItem
                dataItem={data}
                index={index}
                id={data._id}
                primaryKeyType={schemaObj.current.properties["_id"].type}
                key={data._id}
                //@ts-ignore
                tableHead={tableHeadRef.current.map((e) => [
                  e,
                  schemaPropertiesRef.current[e].type,
                ])}
                objectType={schemaType}
              />
            ))
          ) : (
            <tr>
              <td>{`No ${schemaType}`}</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>{`Total documents ${datas.length}`}</td>
            <td colSpan={Object.keys(schemaPropertiesRef.current).length}>
              {/* <LinkItem
                item={{
                  name: 'Insert new one',
                  link: `${lng}/admin/${schemaObj.current.name}/insert`,
                  description: `Insert a new ${schemaObj.current.name} item`,
                }}
                link={`${lng}/admin/${schemaObj.current.name}/insert`}
                close={() => {}}
              >
                <button>Insert</button>
              </LinkItem> */}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// function useTable(arg0: { columns: { Header: string; accessor: string; }[]; data: { col1: string; col2: string; }[]; }): { getTableProps: any; getTableBodyProps: any; headerGroups: any; rows: any; prepareRow: any; } {
//   throw new Error('Function not implemented.');
// }

