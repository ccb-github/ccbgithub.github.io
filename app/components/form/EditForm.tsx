"use client"
//TODO type check
import { useApp } from "#/hooks/useApp"
import fieldConvert from "#/lib/fieldConvert"

import React, { FormEvent, useEffect, useRef } from "react"
import { BSON } from "realm-web"
import { SchemaObject } from "#/lib/schema/format"
import { insertDataToCol, updateCollection } from "#/lib/api/mongoService"
import { templateHTML } from "./templateHTML"
import { ErrorWithMessage } from "#/types/error"
import { useTranslation } from "#/lib/i18n/client"

//TODO default value with name
/** filter: filterProps,
 * Description 
 * Search by filter, given param id will filter._id
 * @date 2023-03-29
 * @param {SchemaObject} schemaObj : schema object used as the template for rendering the table

 * @param {string} lng}: Language string, etc: ch, en
 * @returns {HTMLFormElement}
 */
export default function EditDataForm({
  schemaObj,
  children,
  customizeSubmitAction,
  initialValue,
  lng,
}: {
  schemaObj: SchemaObject<"TypeDefault">
  customizeSubmitAction?: (theData: unknown) => void
  lng: string
  initialValue: unknown
  children?: React.ReactNode
}) {
  const mongodbApp = useApp()
  const { t } = useTranslation(lng)
  //TODO we need type
  const insertData = useRef<{
    ownerId?: string
    _id?: BSON.ObjectID
  }>({})
  //The qrcode content

  useEffect(() => {
    console.log("SchemaObj", { schemaObj })
    if (!mongodbApp.currentUser?.id) {
      throw new Error("Please login first")
    }
  })

  const submitForm = async (submitEvent: FormEvent<HTMLFormElement>) => {
    let insertResult
    try {
      submitEvent.preventDefault()
      const eventForm = submitEvent.target as HTMLFormElement
      const FD = new FormData(eventForm)
      console.log(FD)
      for (const item of FD.entries()) {
        Object.defineProperty(insertData.current, item[0], {
          writable: true,
          enumerable: true,
          //@ts-ignore
          value: fieldConvert(item[1], schemaObj.properties[item[0]].type),
        })
      }
      insertData.current._id = new BSON.ObjectId()

      //If the schema item has ownerId field(Indicate the owner's account id, initialize it from current user's id from mongodbApp)
      if (Object.keys(schemaObj.properties).includes("ownerId")) {
        insertData.current.ownerId = mongodbApp.currentUser?.id
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prettier/prettier
      ({ insertedId: insertResult } = await insertDataToCol(
        mongodbApp.currentUser!,
        schemaObj["name"],
        insertData.current,
      ))
      await updateCollection(
        mongodbApp.currentUser!,
        schemaObj["name"],
        { _id: insertData.current._id },
        insertData.current,
      )
      customizeSubmitAction
        ? customizeSubmitAction(mongodbApp.currentUser!.id)
        : ""

      console.table(insertResult)
    } catch (error) {
      if ((error as ErrorWithMessage).message) {
        alert((error as ErrorWithMessage).message)
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
      className={`
          grid grid-cols-1 gap-5 lg:grid-cols-2 
          h-full overflow-y-scroll pt-2
        `}
    >
      {Object.values(schemaObj.properties).map((schemaProperty) => {
        // const schemaProperty = schemaObj.properties[propKey]
        return templateHTML({
          ...schemaProperty,
          defaultValue: initialValue[schemaProperty["name"]],
        })
      })}
      {children}
      <div className="form-group">
        <button type="submit" className="m-2">
          {t("Submit")}
        </button>
      </div>
    </form>
  )
}
