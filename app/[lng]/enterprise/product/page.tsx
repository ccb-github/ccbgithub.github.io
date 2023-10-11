import Button from "#/components/common/Button";
import ReactTable from "#/components/common/ReactTable";
import { queryProducts, updateProducts } from "#/lib/api/apolloService"
import { type BasePageProps } from "#/types/pageProp"
import { SchemaResultMapper } from "#/types/schema";
import React from "react"
import { BSON } from "realm-web";


export default async function EnterpriseProductManagePage({
  params: { lng },
}: BasePageProps) {
  // The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first
  const products = await queryProducts()

  return (
    <div id="data-table" className="h-full w-full">
      <ReactTable
        data={products}
        columnAccessors={
          ["name", "assemblePlace", "produceDay", "shelfLife", "standard"] as Array<
            keyof SchemaResultMapper["Product"]
          >
        }
        // customColumns={[
        //   (id: string) => (
        //     <Button
        //       key={0}
        //       className="m-auto"
        //       onClick={async () => {
        //         "use server"

        //         const updateResult = await updateProducts({
        //           query: { _id: new BSON.ObjectId(id) },
        //           set: {
        //             status: "出库",
        //           },
        //         })
        //       }}
        //     ></Button>
        //   ),
        // ]}
        schemaType={"Product"}
        deleteEnabled={true}
        lng={lng}
      />
    </div>
  )
}
