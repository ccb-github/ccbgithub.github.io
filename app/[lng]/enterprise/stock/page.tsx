import ReactTable from "#/components/common/ReactTable"
import { BasePageProps } from "#/types/pageProp"

export default async function EnterpriseStockPage({
  params: { lng },
}: BasePageProps) {
  return (
    <div className="space-y-4">
      <ReactTable
        lng={lng}
        data={[]}
        deleteEnabled={false}
        schemaType={"Stock"}
      />
    </div>
  )
}
