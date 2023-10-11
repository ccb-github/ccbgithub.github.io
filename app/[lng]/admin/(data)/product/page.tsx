import ProductTable from "#/components/common/table/ProductTable"
import { queryProducts } from "#/lib/api/gql/product"
import { type BasePageProps } from "#/types/pageProp"
import React from "react"

export default async function AdminProductManagePage({
  params: { lng },
}: BasePageProps) {
  // The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
  const products = await queryProducts()

  return (
    <div id="data-table" className="h-full w-full">
      {/*    <SchemaDataReactTable
        data={products}
        columnAccessors={
          ["name", "assemblePlace", "produceDay", "shelfLife"] as Array<
            keyof SchemaResultMapper["Product"]
          >
        }
        schemaType={"Product"}
        deleteEnabled={true}
        lng={lng}
      /> */}
      <ProductTable data={products} lng={lng} />
    </div>
  )
}
