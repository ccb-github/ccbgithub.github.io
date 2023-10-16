"use client"
import { normalSchemaJson } from "#/lib/schema"

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
import enterpriseSchemaJson, { EnterpriseSchema } from "#/lib/schema/def/enterprise"

type EnterpriseReactTableProps = GeneralDataTableWrapperProps<
  Partial<Record<keyof EnterpriseSchema, string>> & {
    _id: string
  }
>

/**
 * @link EnterpriseReactTableProps props -- The react props
 * @returns {React.ReactNode} -- Enterprise data table
 */
export default function EnterpriseTable({
  data,
  lng,
}: EnterpriseReactTableProps) {
  const { t } = useTranslation(lng, "enterprise")

  const schemaPropertiesRef = useRef(normalSchemaJson["Enterprise"].properties)
  const realmApp = useApp()
  const router = useRouter()
  const editLink = `/${lng}/${
    realmApp.currentUser?.customData.role ?? "share"
  }/edit/order`

  return (
    <SchemaDataReactTable<
      Partial<Record<keyof EnterpriseSchema, string>> & {
        _id: string
      }
    >
      lng={lng}
      data={data}
      schemaType={"Enterprise"}
      deleteEnabled={true}
      columnOptions={
        Object.values(enterpriseSchemaJson.properties).map(
        (prop) => ({
          accessor: prop.mapTo as keyof EnterpriseSchema,
          header: t(prop.mapTo),
          type: prop.dataType,
        }))
      }
      customColumn={() => {
        return (
          <>
            <Button
              className="m-auto"
              onClick={(event) => {
                const self: HTMLButtonElement =
                  event.currentTarget as HTMLButtonElement
                deleteDocuments(realmApp.currentUser!, "Enterprise", {
                  _id: fieldConvert(
                    self.dataset.id!,
                    schemaPropertiesRef.current["_id"].dataType
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
    />
  )
}
