import CategoryTable from "#/components/common/table/CategoryTable"
import { queryCategories } from "#/lib/api/gql/category"
import { BasePageProps } from "#/types/pageProp"

export default async function AdminEnterpriseManagePage({
  params: { lng },
}: BasePageProps) {
  //The url is lowercase, but the schema name to search the database are like 'Name', we need to convert first

  const { categories } = await queryCategories()
  return (
    <div id="data-table" className="h-full w-full">
      <CategoryTable lng={lng} data={categories} />
    </div>
  )
}
