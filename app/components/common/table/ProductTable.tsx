"use client"
import { schemaJson } from "#/lib/schema"
import type { SchemaResultMapper, ProductSchema } from "#/types/schema"
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

type ProductReactTableProps = GeneralDataTableWrapperProps<
  Partial<Record<keyof ProductSchema, string>> & {
    _id: string
  }
>

/**
 * @prop {ProductReactTableProps} props -- The react props
 * @returns {React.ReactNode} -- Product data table
 */
export default function ProductTable({ data, lng }: ProductReactTableProps) {
  //TODO the language props
  const { t } = useTranslation(lng, "product")
  // const [columnResizeMode] = useState<ColumnResizeMode>(
  //   ColumnResizeMode["onChange"],
  // )
  const schemaPropertiesRef = useRef(schemaJson["Product"].properties)
  const realmApp = useApp()
  const router = useRouter()
  const editLink = `/${lng}/${
    realmApp.currentUser?.customData.role ?? "share"
  }/edit/product`

  return (
    <SchemaDataReactTable<
      Partial<Record<keyof SchemaResultMapper["Product"], string>> & {
        _id: string
      }
    >
      lng={lng}
      data={data}
      schemaType={"Product"}
      deleteEnabled={true}
      customColumn={() => {
        return (
          <>
            <Button
              className="m-auto"
              onClick={(event) => {
                const self: HTMLButtonElement =
                  event.currentTarget as HTMLButtonElement
                deleteDocuments(realmApp.currentUser!, "Product", {
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
