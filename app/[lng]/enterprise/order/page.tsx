import OrderTable from "#/components/common/table/OrderTable"
import { queryOrders } from "#/lib/api/gql/order"

export default async function Page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const orders = await queryOrders()
  //All field are return as string
  console.log(orders)
  return <OrderTable data={orders} />
}
