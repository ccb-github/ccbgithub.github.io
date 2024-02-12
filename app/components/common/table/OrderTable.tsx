"use client"
import { normalSchemaMap } from "#/lib/schema"
import React, { useMemo, useRef } from "react"
import { FaReacteurope } from "react-icons/fa"
import { useTranslation } from "#/lib/i18n/client"
import Link from "next/link"
import { EditIcon } from "#/components/icons"
import Button from "../Button"
import { deleteDocuments } from "#/lib/api/mongoService"
import fieldConvert from "#/lib/fieldConvert"
import { useRouter } from "next/navigation"
import SchemaDataReactTable from "../SchemaDataReactTable"
import { useApp } from "#/hooks/useApp"
import { GeneralDataTableWrapperProps } from "#/types/table"
import { OrderSchema } from "#/lib/schema/def/order"

type OrderTableProps = GeneralDataTableWrapperProps<
  Partial<Record<keyof OrderSchema, string>> & {
    _id: string
  }
>
/**
 * Prop def
 * @typedef {OrderTableProps} TheProps
 * @member {SchemaName} schemaType
/**
 * Description
 * @param {OrderTableProps} props -- The react props
 * @returns {React.ReactNode}
 */
export default function OrderTable({ data, lng }: OrderTableProps) {
  //TODO the language props
  const { t } = useTranslation(lng!, "order")
  // const [columnResizeMode] = useState<ColumnResizeMode>(
  //   ColumnResizeMode["onChange"],
  // )
  const schemaPropertiesRef = useRef(normalSchemaMap["Order"].properties)
  const realmApp = useApp()
  const router = useRouter()
  // const defaultColumn = useMemo(
  //   () => ({
  //     // Our default Filter UI
  //     Filter: DefaultColumnFilter,
  //   }),
  //   [],
  // )
  const userProfile = useMemo(() => {
    return realmApp.currentUser ? realmApp.currentUser.customData : {}
    
  }, [])
  return (
    <SchemaDataReactTable<
      Partial<Record<keyof OrderSchema, unknown>> & {
        _id: string
      }
    >
      lng={lng}
      data={data}
      schemaType={"Order"}
      deleteEnabled={true}
      columnOptions={Object.values(normalSchemaMap["Order"].properties).map(
        (prop) => ({
          accessor: prop.mapTo as keyof OrderSchema,
          header: t(prop.mapTo),
          type: prop.dataType,
        }),
      )}
      customColumn={() => {
        return (
          <>
            <Button
              className="m-auto"
              onClick={(event) => {
                const self: HTMLButtonElement =
                  event.currentTarget as HTMLButtonElement
                deleteDocuments(realmApp.currentUser!, "Order", {
                  _id: fieldConvert(
                    self.dataset.id!,
                    schemaPropertiesRef.current["_id"].dataType,
                  ),
                })
                  .then(() => {
                    router.refresh()
                  })
                  .catch((error) => {
                    throw error
                  })
              }}
            >
              {t("Delete", "common")}
              <FaReacteurope className="inline-block w-4 h-4" />
            </Button>
            <span className="m-auto">
              <Link
                href={
                  `/${lng}/${
                    userProfile.role
                  }/edit/order`
                }
              >
                {t("Edit")}
                <EditIcon className="inline-block w-4 h-4" />
              </Link>
            </span>
          </>
        )
      }}
    />
  )
}
