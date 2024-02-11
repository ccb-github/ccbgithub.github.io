import RegulatoryTable from "#/components/common/table/RegulatoryTable"
import { getAllRegulatory } from "#/lib/api/gql/regulatory"
import { BasePageProps } from "#/types/pageProp"

export default async function AdminRegulatoryManagePage({
  params: { lng },
}: BasePageProps) {
  const allRegulatory = await getAllRegulatory({})

  return (
    <div
      id="data-table"
      className="h-full w-full overflow-x-scroll overflow-y-scroll"
    >
      <RegulatoryTable lng={lng} data={allRegulatory} />
    </div>
  )
}
