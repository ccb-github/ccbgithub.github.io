"use client"
import { useApp } from "#/hooks/useApp"
import { insertDataToCol } from "#/lib/api/mongoService"
import fieldConvert from "#/lib/fieldConvert"
import { normalSchemaMap } from "#/lib/schema"
import { useRef, FormEvent } from "react"
import { BSON } from "realm-web"

export function AddProductForm() {
  const insertData = useRef({})
  const mongodbApp = useApp()
  const submitForm = async (submitEvent: FormEvent<HTMLFormElement>) => {
    try {
      submitEvent.preventDefault()
      const eventForm: HTMLFormElement = submitEvent.target as HTMLFormElement
      const FD = new FormData(eventForm)
      console.log(FD)
      // const mongoCollection = mongodbApp?.currentUser
      //   ?.mongoClient('mongodb-atlas')
      //   .db('qrcodeTraceability')
      //   .collection(schemaObj.name)
      for (const item of FD.entries()) {
        Object.defineProperty(insertData.current, item[0], {
          writable: true,
          enumerable: true,
          value: fieldConvert(
            item[1],
            normalSchemaMap["Product"].properties[item[0]].type,
          ),
        })
      }
      Object.defineProperty(insertData.current, "_id", {
        value: new BSON.ObjectId(),
        enumerable: true,
        writable: false,
      })
      Object.defineProperty(insertData.current, "ownerId", {
        value: mongodbApp!.currentUser?.id,
        enumerable: true,
        writable: false,
      })

      //insertData.current.producer = await getData(mongodbApp.currentUser,'Enterprise')
      // if( Object.keys(schemaObj.properties).includes('ownerId')){
      // }
      //Object field undefined is not ok
      const result = insertDataToCol(mongodbApp!.currentUser!, "Product", {
        ...insertData.current,
      })

      // console.log('Insert data', insertData.current)
      // let result = await mongoCollection?.insertOne(insertData.current)
      console.table(result)
      // alert(`Just insert ${schemaObj.name} one with ${result}`)
    } catch (error) {
      if (error.message) {
        alert((error as { message: string }).message)
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
        <button type="submit" className="w-1/5 p-1">
          Submit
        </button>
      </div>
    </form>
  )
}