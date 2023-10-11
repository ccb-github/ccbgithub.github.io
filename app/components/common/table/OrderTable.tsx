"use client"
import { schemaJson } from "#/lib/schema"
import type { SchemaResultMapper, OrderSchema } from "#/types/schema"
import React, { useRef } from "react"
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
  const schemaPropertiesRef = useRef(schemaJson["Order"].properties)
  const realmApp = useApp()
  const router = useRouter()
  // const defaultColumn = useMemo(
  //   () => ({
  //     // Our default Filter UI
  //     Filter: DefaultColumnFilter,
  //   }),
  //   [],
  // )

  return (
    <SchemaDataReactTable<
      Partial<Record<keyof SchemaResultMapper["Order"], unknown>> & {
        _id: string
      }
    >
      lng={lng}
      data={data}
      schemaType={"Order"}
      deleteEnabled={true}
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
                href={`/${lng}/${
                  realmApp.currentUser!.customData.role
                }/edit/order`}
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
