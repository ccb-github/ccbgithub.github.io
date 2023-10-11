import SchemaDataReactTable from "#/components/common/SchemaDataReactTable"
import { queryEnterprises } from "#/lib/api/gql/enterprise"
import { BasePageProps } from "#/types/pageProp"

export default async function AdminEnterpriseManagePage({
  params: { lng },
}: BasePageProps) {
  //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first

  const enterprises = await queryEnterprises()
  return (
    <div
      id="data-table"
      className="h-full w-full overflow-x-scroll overflow-y-scroll"
    >
      <SchemaDataReactTable<{
        _id: string
        name: string
        address: string
        createdAt: string
        creditCode: string
        registerPlace: string
      }>
        lng={lng}
        data={enterprises}
        schemaType={"Enterprise"}
        columnAccessors={[
          "name",
          "address",
          "createdAt",
          "creditCode",
          "registerPlace",
        ]}
        deleteEnabled={true}
      />
    </div>
  )
}
