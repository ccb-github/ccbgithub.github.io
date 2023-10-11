import RegulatoryTable from "#/components/common/table/RegulatoryTable"
import { queryRegulatories } from "#/lib/api/gql/regulatory"
import { BasePageProps } from "#/types/pageProp"

export default async function AdminRegulatoryManagePage({
  params: { lng },
}: BasePageProps) {
  const regulatories = await queryRegulatories({})

  return (
    <div
      id="data-table"
      className="h-full w-full overflow-x-scroll overflow-y-scroll"
    >
      <RegulatoryTable lng={lng} data={regulatories} />
    </div>
  )
}
