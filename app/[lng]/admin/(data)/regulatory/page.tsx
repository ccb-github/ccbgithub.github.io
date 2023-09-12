import ReactTable from "#/components/common/ReactTable"
import { getRegulatories } from "#/lib/api/apolloService"

import { BasePageProps } from "#/types/pageProp"

export default async function AdminRegulatoryManagePage({
  params: { lng },
}: BasePageProps) {
  const schemaType = "Regulatory"
  const { regulatories } = await getRegulatories({})

  return (
    <div
      id="data-table"
      className="h-full w-full overflow-x-scroll overflow-y-scroll"
    >
      <ReactTable
        data={regulatories}
        schemaType={schemaType}
        deleteEnabled={true}
        columnAccessors={["description", "address", "name"]}
        lng={lng}
      />
    </div>
  )
}
