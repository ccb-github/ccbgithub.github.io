"use client"
import { useApp } from "#/hooks/useApp"
import fieldConvert from "#/lib/fieldConvert"

import React, { FormEvent, useRef } from "react"
import { BSON } from "realm-web"
import { normalSchemaJson } from "#/lib/schema"
import { NormalSchemaName } from "#/lib/schema/format"
import { EnterpriseSchema } from "#/lib/schema/def/enterprise"
import { templateHTML } from "#/components/form/templateHTML"

/* export function RegisterEnterpriseForm() {
  return (
    <form
      method="post"
      action="#"
      id="registerForm"
      className="h-full overflow-y-scroll pt-2"
    >
      <div className="form-group">
        <label className=" control-label" htmlFor="address">
          address
        </label>
        <div className=" w-full">
          <input
            id="address"
            name="address"
            type="text"
            placeholder="please Enter your address here"
            className="form-control input-md w-full"
          />
        </div>
      </div>
      <div className="form-group">
        <label className=" control-label" htmlFor="belong">
          belong{" "}
        </label>
        <div className=" w-full flex-row">
          <select className="flex-1 w-4/5">
            <option value="6388c9f7fa298e1e94321099">
              6388c9f7fa298e1e94321099
            </option>
            <option value="6423e62fcc0427bde8a2dd36">Regulatory 1</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className=" control-label" htmlFor="email">
          email
        </label>
        <div className=" w-full">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="please Enter your email here"
            className="form-control input-md w-full"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label className=" control-label" htmlFor="name">
          name
        </label>
        <div className=" w-full">
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
        <button type="submit">Submit</button>
      </div>
    </form>
  )
} */

export default function RegisterEnterpriseForm({
  type,
}: {
  lng: string
  type: NormalSchemaName
}) {
  const mongodbApp = useApp()
  const schemaObj = normalSchemaJson[type]
  const insertData = useRef<Partial<EnterpriseSchema>>({})

  // const customField = async () => {
  //   insertData.current._id = new BSON.ObjectId()
  //   Object.defineProperty(insertData.current, "_id", {
  //     writable: true,
  //     enumerable: true,
  //     value: new BSON.ObjectId(),
  //   })
  // }
  type HasMessage = {
    message: string
  }
  function safeMessageAccess(target: HasMessage | NonNullable<object>) {
    if ("message" in target) {
      return target.message
    }
    return "No message found"
  }
  // function messageCheck(target: HasMessage | NonNullable<object>, key: string) {
  //   if(key in target )
  //     return target[key]
  // }
  const submitForm = async (submitEvent: FormEvent<HTMLFormElement>) => {
    try {
      submitEvent.preventDefault()
      const eventForm: HTMLFormElement = submitEvent.target as HTMLFormElement
      const FD = new FormData(eventForm)
      console.log(FD)
      for (const item of FD.entries()) {
        Object.defineProperty(insertData.current, item[0], {
          writable: true,
          enumerable: true,
          value: fieldConvert(
            item[1] as string,
            schemaObj.properties[item[0]].type,
          ),
        })
      }
      insertData.current._id = new BSON.ObjectId()

      if (Object.keys(schemaObj.properties).includes("ownerId")) {
        insertData.current.ownerId = mongodbApp.currentUser?.id
      }

      // const result = insertDataToCol(mongodbApp.currentUser, "Product", {...insertData.current,
      //  checker: undefined,
      //  producer: undefined
      // })
      //console.table(result)
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        alert(safeMessageAccess(error))
      }
      submitEvent.preventDefault()
      throw error
    }
  }

  return (
    <form
      method="post"
      action="#"
      id="insertForm"
      onSubmit={submitForm}
      className="h-full overflow-y-scroll
			             pt-2"
    >
      {Object.keys(schemaObj.properties).map((e) =>
        templateHTML(schemaObj.properties[e]),
      )}
      <div className="form-group">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
