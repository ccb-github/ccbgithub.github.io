'use client';
//TODO type check
import { useApp } from '#/hooks/useApp';
import fieldConvert from '#/lib/fieldConvert';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { BSON } from 'realm-web';

import type { SchemaName, SchemaObject, SchemaPropties} from 'types/schema';
import RelatedObjSelect from './RelatedObjSelect';
import { schemaJson } from '#/lib/constants';
import { generalSearchEndpoint, insertDataToCol } from '#/lib/api';


import ModalQRCodeDialog from './ModalQRCodeDialog';
import NormalButton from '../common/NormalButton';
import DateInputFieldTemplate from '../common/input/DateInputFieldTemplate';
import TypeSpan from '../common/input/TypeSpan';
import IntInputFieldTemplate from '../common/input/IntInputFieldTemplate';
import BooleanInputFieldTemplate from '../common/input/BooleanInputFieldTemplate';








export function StringInputFieldTemplate(props: SchemaPropties) {
  return (
    <div key={props.name} className="form-group">
      <div className="w-full p-4">
        <label className=" control-label" htmlFor={props.name}>
          {props.name}
        </label>
        <TypeSpan text="string" className='float-right'/>
      </div>
      <div className=" w-full">
        <input
          name={props.name}
          type="text"
          placeholder={`please Enter your ${props.name} here`}
          className="form-control input-md w-full"
          required={!props.optional}
        />
      </div>
    </div>
  )
}
const OMMIT_FIELD = ["ownerId", "_id"]
export function templateHTML(prop: SchemaPropties) {
	var DATE_FORMAT = 'YYYY-MM-DD HH:MM:SS';
	const DOUBLE_PRECISION = 0.0001
  
  if (prop.name === 'ownerId') {
    return null 
  }
  else if (prop.type === 'int')
    return <IntInputFieldTemplate {...prop} key={prop.name}/>
    
  else if (prop.type === 'double'){
    return (
      <div key={prop.name} className="form-group">
        <div className="w-full p-4">
          <label className=" control-label" htmlFor={prop.name}>
            {prop.name}
          </label>
          <TypeSpan text='date' className='float-right'/>
          <NormalButton text='refresh' className='float-right' 
                        onClick={() => {}}/>
        </div>
        <div className=" w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="number"
            step={DOUBLE_PRECISION}
            required={prop.optional}
            placeholder={`please Enter your ${prop.name} here, presion up to ${DOUBLE_PRECISION}`}
            className="form-control input-md w-full"
          />
        </div>
      </div>
    )
  }
  else if (prop.type === 'date') {
    return <DateInputFieldTemplate key={prop.name} {...prop} />
  } else if (prop.type === 'string') {
    return <StringInputFieldTemplate key={prop.name} {...prop} />
  }  else if (prop.type === 'bool') {
    return <BooleanInputFieldTemplate key={prop.name} {...prop} />
  } 
    else if (prop.type === 'list') {
    return (
      <div key={prop.name} className="form-group">
        <div className="w-full p-4">
          <label className="control-label" htmlFor={prop.name}>
            {prop.name}
          </label>
        </div>
        <div className="w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="text"
            placeholder={`please Enter your ${prop.name} here`}
            className="form-control input-md w-full"
            required={!prop.optional}
          />
        </div>
      </div>
    )
  } 
  else if (prop.type === 'objectId') {
    return null 
  } 
   else if (prop.type === 'object' && prop.objectType === 'Location') {
    console.log('Embed field Loation ' + JSON.stringify(prop))
    return (
      <div key={prop.name} className="form-group">
        <div>
          <label className=" control-label" htmlFor={prop.name}>
            {prop.name}
          </label>
          <button>location</button>
          <button disabled>required</button>
        </div>
        <div className="w-full">
          <label
            className="control-label"
            htmlFor={`${prop.name}Longitude`}
          >{`${prop.name}.longitude`}</label>
          <input
            id={`${prop.name}-longitude`}
            name={prop.name}
            type="text"
            placeholder={`please Enter your ${prop.name}.longtitude here, Location content, required=${prop.optional}`}
          />
          <label className="control-label" htmlFor={`${prop.name}_Latitude`}>
            {' '}
            {`${prop.name}.latitude`}{' '}
          </label>
          <input
            id={`${prop.name}-latitude`}
            name={`${prop.name}`}
            type="text"
            placeholder={`please Enter your ${prop.name} latitude here, Location content,    required=" + prop.optional `}
          />
        </div>
      </div>
    )
  }
  // onclick="this.focus();this.select();"
  else if (prop.type === 'object' && prop.objectType === 'Qrcode') {
    return (
      <div key={prop.name} className="form-group">
        <label className=" control-label" htmlFor={`${prop.name}`}>
          {prop.name}
        </label>
        <div className=" w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="textarea"
            placeholder={`please Enter your ${
              prop.name
            } here,generate qrcode base on the content entered   ${
              prop.optional ? '' : 'required'
            }`}
          />{' '}
        </div>
        <div id="qrcode" title="Preview of your qrcode"></div>
      </div>
    )
  } else {
    return (
      <div key={prop.name} className="form-group">
        <label className=" control-label" htmlFor={`${prop.name}`}>
          {prop.name}{' '}
        </label>
        <div className="w-full flex-row">
          <RelatedObjSelect
            objectType={prop.objectType as SchemaName}
  
            linked={false}
            //@ts-ignore
            className="flex-1 w-full"
          />
        </div>
      </div>
    )
  }
};
//TODO default value with name
/** filter: filterProps,
 * Describ
 * Search by filter, given param id will filter._id
 * @date 2023-03-29
 * @param {SchemaObject} schemaObj : schema object used as the template for rendering the table

 * @param {string} lng}: Language string, etc: ch, en
 * @returns {HTMLFormElement}
 */
export default function AddDataForm({
  schemaObj,
  children,
  customizeSubmitAction,
  lng
}: {
  schemaObj: SchemaObject;
  customizeSubmitAction?: (theData: any) => any; 
  lng: string;
  children?: React.ReactNode
}) {
  const mongodbApp = useApp()
  //TODO we need type
  const insertData = useRef<{
    ownerId?: string;
    _id?: BSON.ObjectID
  }>({})
  //The qrcode content 
  const [qrCodeMessage, setQRCodeMessage] = useState<any>(null)
  useEffect(() => {
    console.log('SchemaObj', { schemaObj })
    if (!mongodbApp.currentUser?.id) {
      throw new Error("Please login first")
    }
    
  })
	const customField = async () => {
		 
    insertData.current._id = new BSON.ObjectId()
		Object.defineProperty(insertData.current, '_id', {
			writable: true,
			enumerable: true,
			value: new BSON.ObjectId(),
		})
	}
  
  const submitForm = async (submitEvent: FormEvent<HTMLFormElement>) => {
    let insertResult
    try {
      submitEvent.preventDefault()
      //@ts-ignore submitEvent: FormEvent<HTMLFormElement>
      const eventForm: HTMLFormElement = submitEvent.target
      const FD = new FormData(eventForm)
      console.log(FD)
      const mongoCollection = mongodbApp?.currentUser
        ?.mongoClient('mongodb-atlas')
        .db('qrcodeTraceability')
        .collection(schemaObj.name)
      for (let item of FD.entries()) {
        Object.defineProperty(insertData.current, item[0], {
          writable: true,
          enumerable: true,
          value: fieldConvert(item[1], schemaObj.properties[item[0]].type),
        })
      }
      insertData.current._id = new BSON.ObjectId()
      
      //If the schema item has ownerId field(Indicate the owner's account id, initize it from current user's id from mongodbApp)
      if( Object.keys(schemaObj.properties).includes('ownerId')){
        insertData.current.ownerId = mongodbApp.currentUser?.id
      }
     
      
      ({insertedId: insertResult} = await insertDataToCol(mongodbApp.currentUser!, schemaObj["name"], insertData.current)
      )
      customizeSubmitAction ? customizeSubmitAction(mongodbApp.currentUser!.id) : ""
      
      console.table(insertResult)
      setQRCodeMessage(generalSearchEndpoint +`?arg1=Product&arg2=name&arg3=${'Product a'}`)
      
     
    } catch (error: any) {
      
      if(error.message){
        //@ts-ignore
        alert(error.message)
      }
      submitEvent.preventDefault()
      throw error
    } finally {
      
      
    }
  }
  
 
  return (
    <>
      {qrCodeMessage ? <ModalQRCodeDialog lng={lng} src={qrCodeMessage}/> : null}
      <form
        method="post"
        action="#"
        id="insertForm"
        onSubmit={submitForm}
        className={`
          grid grid-cols-1 gap-5 lg:grid-cols-2 
          h-full overflow-y-scroll pt-2
        `}
      >
        {Object.keys(schemaObj.properties).map((e) =>
          templateHTML(schemaObj.properties[e]),
        )}
        {children}
        {/* <RelatedItemDialog itemType='Product'/> */}
        <div className="form-group">
          <button type="submit" className='m-2'>
            Submit
          </button>
        </div>
        
      </form>
    </>
  )
}

export function AddProductForm() {
  const insertData = useRef({})
  const mongodbApp = useApp()
  const submitForm = async (submitEvent: FormEvent<HTMLFormElement>) => {
    try {
      submitEvent.preventDefault()
      //@ts-ignore submitEvent: FormEvent<HTMLFormElement>
      const eventForm: HTMLFormElement = submitEvent.target
      const FD = new FormData(eventForm)
      console.log(FD)
      // const mongoCollection = mongodbApp?.currentUser
      //   ?.mongoClient('mongodb-atlas')
      //   .db('qrcodeTraceability')
      //   .collection(schemaObj.name)
      for (let item of FD.entries()) {
        Object.defineProperty(insertData.current, item[0], {
          writable: true,
          enumerable: true,
          value: fieldConvert(item[1], schemaJson["Product"].properties[item[0]].type),
        })
      }
      
      insertData.current._id = new BSON.ObjectId()
      insertData.current.ownerId = mongodbApp.currentUser?.id

      //insertData.current.producer = await getData(mongodbApp.currentUser,'Enterprise')
      // if( Object.keys(schemaObj.properties).includes('ownerId')){
      // }
      //Object field undefined is not ok
      const result = insertDataToCol(
        mongodbApp.currentUser!, 
        "Product", {
        ...insertData.current
      })
      
      // console.log('Insert data', insertData.current)
      // let result = await mongoCollection?.insertOne(insertData.current)
     console.table(result)
      // alert(`Just insert ${schemaObj.name} one with ${result}`)
     
    } catch (error: any) {
      
      if(error.message){
        //@ts-ignore
        alert(error.message)
      }
      
      throw error
    }
  }
  return (
    <form
      method="post"
      action="#"
      id="insertForm"
      onSubmit={submitForm}
      className="h-full overflow-y-scroll grid grid-cols-1 lg:grid-cols-2  pt-2"
    >
      <div className="form-group">
        <label className=" control-label" htmlFor="assemlePlace">
          assemlePlace
        </label>
        <div className="w-full">
          <input
            id="assemlePlace"
            name="assemlePlace"
            type="text"
            placeholder="please Enter your assemlePlace here"
            className="form-control input-md w-full"
          />
        </div>
      </div>
     
      <div className="form-group">
        <label className="control-label" htmlFor="description">
          description
        </label>
        <div className=" w-full">
          <input
            id="description"
            name="description"
            type="text"
            placeholder="please Enter your description here"
            className="form-control input-md w-full"
            
          />
        </div>
      </div>
      <div className="form-group">
        <div className="flex w-full justify-between">
          <label className="control-label" htmlFor="produceDay">
            produceDay
          </label>
          <button>Date</button>
        </div>
        <div className="w-full">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="please Enter your name here"
            className="form-control input-md w-full"
          />
        </div>
      </div>
    
      <div className="form-group">
        <div className="flex w-full justify-between">
          <label className="control-label" htmlFor="produceDay">
            produceDay
          </label>
          <button>Date</button>
        </div>
        <div className="w-full">
          <input
            id="produceDay"
            name="produceDay"
            type="datetime"
            placeholder={`Fromat: YYYY-MM-DD HH:MM:SS here`}
            className="form-control input-md w-full"
          />
        </div>
      </div>
      <div className="form-group">
        <label className=" control-label" htmlFor="shelfLife">
          shelfLife
        </label>
        <div className="w-full">
          <input
            id="shelfLife"
            name="shelfLife"
            type="number"
            className="form-control input-md"
          />
        </div>
      </div>
      <div className="form-group">
        <label className=" control-label" htmlFor="standard">
          standard
        </label>
        <div className="w-full">
          <input
            id="standard"
            name="standard"
            type="text"
            placeholder="please Enter your standard here"
            className="form-control input-md w-full"
            
          />
        </div>
      </div>
      {/* <div className="form-group">
        <label className=" control-label" htmlFor="producer">
          producer
        </label>
        <div className=" w-full flex-row">
          <select id="producer" name="producer" className="flex-1">
            <option>Select the related producer id</option>
          </select>
          <input
            id="producer"
            name="producer"
            className="flex-1"
            type="text"
            placeholder="Or just enter the primary key manually here producer  "
          />
        </div>
      </div> */}
      {/* <select>
        <option>Select the related Product</option>
      </select> */}
      <div className="form-group lg:col-span-2">
        <button type="submit" className='w-1/5 p-1'>Submit</button>
      </div>
    </form>
  )
}
