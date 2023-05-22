import ReactTable from "#/components/common/ReactTable";
import { getCookieByName } from "#/components/util/cookie";
import { getAllEnterprise, getAllOrders } from "#/lib/api/ApolloEndpoint";
import { useTranslation } from "#/lib/i18n";
import { BasePageProps } from "#/types/page";

export default async function Page({ params: { lng } }: BasePageProps) {
  const { t } = await useTranslation(lng, "enterprise")
  const { orders } = await getAllOrders(getCookieByName("accessToken")!)
  console.log(orders)
  return(
    <ReactTable data={[]} schemaType={"Order"} deleteEnabled={false} />
  )
}