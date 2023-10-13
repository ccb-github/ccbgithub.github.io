"use client"
import { normalSchemaJson } from "#/lib/schema"
import type { SchemaResultMapper, EnterpriseSchema } from "#/types/schema"
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

type EnterpriseReactTableProps = GeneralDataTableWrapperProps<
  readonly Partial<Record<keyof EnterpriseSchema, string>>[] & {
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
      Partial<Record<keyof SchemaResultMapper["Enterprise"], string>> & {
        _id: string
      }
    >
      lng={lng}
      data={data}
      schemaType={"Enterprise"}
      deleteEnabled={true}
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
    />
  )
}
