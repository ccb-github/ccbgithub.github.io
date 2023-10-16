import SchemaDataReactTable from "#/components/common/SchemaDataReactTable"
import { queryCheckRecords } from "#/lib/api/gql/checkRecord"
import { BasePageProps } from "#/types/pageProp"


export default async function RegulatoryHomePage({
  params: { lng },
}: BasePageProps) {
  const checkRecords = await queryCheckRecords()
  console.log(checkRecords)
  return (
    <div className="space-y-4">
      <Checkre
    </div>
  )
}
