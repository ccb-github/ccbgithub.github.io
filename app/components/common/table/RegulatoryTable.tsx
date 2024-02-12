"use client"
import { normalSchemaMap } from "#/lib/schema"
import React, { useRef } from "react"
import { FaReacteurope } from "react-icons/fa"
import { useTranslation } from "#/lib/i18n/client"
import Link from "next/link"
import { EditIcon } from "#/components/icons"
import Button from "../Button"
import { deleteDocuments } from "#/lib/api/mongoService"
import fieldConvert from "#/lib/fieldConvert"
import SchemaDataReactTable from "../SchemaDataReactTable"
import { useApp } from "#/hooks/useApp"
import { useRouter } from "next/navigation"
import { type GeneralDataTableWrapperProps } from "#/types/table"
import regulatorySchema, { RegulatorySchema } from "#/lib/schema/def/regulatory"

type RegulatoryReactTableProps = GeneralDataTableWrapperProps<
  Partial<Record<keyof RegulatorySchema, string>> & {
    _id: string
  }
>

/**
 * @prop {RegulatoryReactTableProps} props -- The react props
 * @returns {React.ReactNode} -- Regulatory data table
 */
export default function RegulatoryTable({
  data,
  lng,
}: RegulatoryReactTableProps) {
  const { t } = useTranslation(lng, "regulatory")
  const schemaPropertiesRef = useRef(normalSchemaMap["Regulatory"].properties)
  const realmApp = useApp()
  const router = useRouter()
  const editLink = `/${lng}/${
    realmApp.currentUser?.customData.role ?? "share"
  }/edit/regulatory`

  return (
    <SchemaDataReactTable<
      Partial<Record<keyof RegulatorySchema, string>> & {
        _id: string
      }
    >
      lng={lng}
      data={data}
      schemaType={"Regulatory"}
      deleteEnabled={true}
      customColumn={() => {
        return (
          <>
            <Button
              className="m-auto"
              onClick={(event) => {
                const self: HTMLButtonElement =
                  event.currentTarget as HTMLButtonElement
                deleteDocuments(realmApp.currentUser!, "Regulatory", {
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
              <Link href={editLink}>
                {t("Edit")}
                <EditIcon className="inline-block w-4 h-4" />
              </Link>
            </span>
          </>
        )
      }}
      columnOptions={Object.values(regulatorySchema.properties).map((prop) => ({
        accessor: prop.mapTo as keyof RegulatorySchema,
        header: t(prop.mapTo),
        type: prop.dataType,
      }))}
    />
  )
}
