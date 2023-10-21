"use client"
//TODO type check
import { useApp } from "#/hooks/useApp"
import fieldConvert from "#/lib/fieldConvert"

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { BSON } from "realm-web"

import { insertDataToCol } from "#/lib/api/mongoService"

import ModalQRCodeDialog from "./ModalQRCodeDialog"
import { templateHTML } from "./templateHTML"
import { NormalSchemaName, SchemaName, SchemaObject} from "#/lib/schema/format"

//TODO default value with name
/** filter: filterProps,
 * Describe
 * Search by filter, given param id will filter._id
 * @date 2023-03-29
 * @param {SchemaObject} schemaObj : schema object used as the template for rendering the table

 * @param {string} lng}: Language string, etc: ch, en
 * @returns {HTMLFormElement}
 */
export default function AddDataForm<SchemaN extends SchemaName>({
  schemaObj,
  schemaName,
  children,
  customizeSubmitAction,
  lng,
}: {
  schemaObj: SchemaObject<SchemaN>
  schemaName: SchemaN
  customizeSubmitAction?: (theData: unknown) => unknown
  // TODO the type
  customizeField?: unknown
  lng: string
  children?: React.ReactNode
}) {
  const mongodbApp = useApp()
  //TODO we need type
  // const insertData = useRef<Partial<SchemaResultMapper[NormalSchemaName]>>(
  //   Object.create({}),
  // )
  const formRef = useRef<HTMLFormElement>(null)
  //The qrcode content
  const [qrCodeMessage, setQRCodeMessage] = useState<string | null>(null)

  const submitForm = useCallback(
    async (submitEvent: FormEvent<HTMLFormElement>) => {
      // TODO the data without name
      let insertResult
      try {
        submitEvent.preventDefault()
        const eventForm: HTMLFormElement = submitEvent.target as HTMLFormElement
        const FD = new FormData(eventForm)
        console.log(FD)
        // TODO should we use Object.create
        const insertData = Object.create({})
        // TODO error, we can not handle the file input
        for (const item of FD.entries()) {
          Object.defineProperty(insertData, item[0], {
            writable: true,
            enumerable: true,
            value: fieldConvert(
              item[1] as string,
              schemaObj.properties[item[0]].dataType,
            ),
          })
        }
        Object.defineProperty(insertData, "_id", {
          writable: true,
          enumerable: true,
          value: new BSON.ObjectId(),
        })

        //If the schema item has ownerId field(Indicate the owner's account id, initize it from current user's id from mongodbApp)
        if (Object.keys(schemaObj.properties).includes("ownerId")) {
          Object.defineProperty(insertData, "ownerId", {
            writable: true,
            enumerable: true,
            value: mongodbApp.currentUser!.id,
          })
        }

        ({ insertedId: insertResult } = await insertDataToCol(
          mongodbApp!.currentUser!,
          schemaObj["name"],
          insertData,
        ))
        customizeSubmitAction
          ? customizeSubmitAction(mongodbApp?.currentUser!.id)
          : ""

        console.table(insertResult)
        setQRCodeMessage(
          process.env.NEXT_PUBLIC_PRODUCT_SEARCHPOINT! +
            `?arg1=${schemaName}&arg2=_id&arg3=${insertData._id.toHexString()}`,
        )
      } catch (error) {
        submitEvent.preventDefault()
        throw error
      }
    },
    [customizeSubmitAction, mongodbApp, schemaName, schemaObj],
  )
  useEffect(() => {
    if (mongodbApp?.currentUser?.id) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      formRef.current!.onsubmit = submitForm
    }
  }, [mongodbApp?.currentUser?.id, submitForm])

  return (
    <>
      {qrCodeMessage ? (
        <ModalQRCodeDialog
          lng={lng}
          src={qrCodeMessage}
          closeAction={async () => {
            setQRCodeMessage(null)
          }}
        />
      ) : null}
      <form
        method="post"
        action="#"
        ref={formRef}
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
        <div className="form-group lg:col-span-2">
          <button type="submit" className="m-2">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}
