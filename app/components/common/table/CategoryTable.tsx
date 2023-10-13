"use client"
import { normalSchemaJson } from "#/lib/schema"
import type { SchemaResultMapper } from "#/types/schema"
import React, { useRef } from "react"
import { FaReacteurope } from "react-icons/fa"

import { useTranslation } from "#/lib/i18n/client"
import Link from "next/link"
import { EditIcon } from "#/components/icons"
import Button from "#/components/common/Button"
import { deleteDocuments } from "#/lib/api/mongoService"
import fieldConvert from "#/lib/fieldConvert"
import SchemaDataReactTable from "../SchemaDataReactTable"
import { useApp } from "#/hooks/useApp"
import { useRouter } from "next/navigation"
import { type GeneralDataTableWrapperProps } from "#/types/table"
import { CategorySchema } from "#/lib/schema/def/category"

type CategoryReactTableProps = GeneralDataTableWrapperProps<
  Partial<Record<keyof CategorySchema, string>> & {
    _id: string
  }
>

/**
 * @link CategoryReactTableProps props -- The react props
 * @returns {React.ReactNode} -- Category data table
 */
export default function CategoryTable({ data, lng }: CategoryReactTableProps) {
  const { t } = useTranslation(lng, "enterprise")

  const schemaPropertiesRef = useRef(normalSchemaJson["Category"].properties)
  const realmApp = useApp()
  const router = useRouter()
  const editLink = `/${lng}/${
    realmApp.currentUser?.customData.role ?? "share"
  }/edit/category`

  return (
    <SchemaDataReactTable<
      Partial<Record<keyof SchemaResultMapper["Category"], string>> & {
        _id: string
      }
    >
      lng={lng}
      data={data}
      schemaType={"Category"}
      deleteEnabled={true}
      customColumn={() => {
        return (
          <>
            <Button
              className="m-auto"
              onClick={(event) => {
                const self: HTMLButtonElement =
                  event.currentTarget as HTMLButtonElement
                deleteDocuments(realmApp.currentUser!, "Category", {
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
            <Button className="m-auto">
              <Link href={editLink}>
                {t("Edit")}
                <EditIcon className="inline-block w-4 h-4" />
              </Link>
            </Button>
          </>
        )
      }}
      columnOptions={Object.values(normalSchemaJson["Category"].properties).map(
        (prop) => ({
          accessor: prop.mapTo as keyof CategorySchema,
          header: t(prop.mapTo),
          type: prop.dataType,
        }),
      )}
    />
  )
}
