import { BasePageProps } from "#/types/pageProp"
import { queryCheckRecords } from "#/lib/api/apolloService"
import ReactTable from "#/components/common/ReactTable"
import { SchemaResultMapper } from "#/types/schema"

export default async function RegulatoryHomePage({
  params: { lng },
}: BasePageProps) {
  const checkRecords = await queryCheckRecords()
  console.log(checkRecords)
  return (
    <div className="space-y-4">
      <ReactTable
        lng={lng}
        data={checkRecords}
        columnAccessors={
          ["name", "device", "target", "method", "_id"] as Array<
            keyof SchemaResultMapper["CheckRecord"]
          >
        }
        schemaType={"CheckRecord"}
        deleteEnabled={false}
      />
    </div>
  )
}
