import ProductTable from "#/components/common/table/ProductTable"
import { queryProducts } from "#/lib/api/gql/product"
import { type BasePageProps } from "#/types/pageProp"
import React from "react"

export default async function EnterpriseProductManagePage({
  params: { lng },
}: BasePageProps) {
  // The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
  const products = await queryProducts()

  return (
    <div id="data-table" className="h-full w-full">
      <ProductTable lng={lng} data={products} />
    </div>
  )
}
