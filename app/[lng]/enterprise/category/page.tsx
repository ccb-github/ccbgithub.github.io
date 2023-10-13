import CategoryTable from "#/components/common/table/CategoryTable"
import { queryCategories } from "#/lib/api/gql/category"
import { type BasePageProps } from "#/types/pageProp"
import React from "react"

export default async function EnterpriseCategoryManagePage({
  params: { lng },
}: BasePageProps) {
  const categories = await queryCategories()

  return (
    <div id="data-table" className="h-full w-full">
      <CategoryTable lng={lng} data={categories} />
    </div>
  )
}
