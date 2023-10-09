import { getCookieByName } from "#/components/util/cookie"
import { SchemaResultMapper } from "#/types/schema"
import { gql } from "@apollo/client"
import { createClient } from "../apolloClient"

export const QUERY_ORDERS = gql`
  query queryOrders {
    orders {
      _id
      customerId
      orderTime
      products {
        _id
        name
      }
      # Related products
    }
  }
`
export async function queryOrders(): Promise<
  {
    _id: string
    customerId: string
    orderTime: string
    products: {
      _id: string
      name: string
    }
  }[]
> {
  "use server"
  const client = createClient(getCookieByName("accessToken")!)
  try {
    const {
      data: { orders },
    } = await client.query({
      query: QUERY_ORDERS,
    })
    console.groupEnd()
    console.log("This is the order now")
    return orders
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const INSERT_ORDER = gql`
  mutation insertOneOrder($data: OrderInsertInput!) {
    insertOneOrder(data: $data) {
      _id
      products {
        _id
      }
    }
  }
`

export async function insertOrder(
  insertData: Partial<SchemaResultMapper["Order"]>,
) {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const { data: resultData } = await client.mutate({
      mutation: INSERT_ORDER,
      variables: {
        data: insertData,
      },
    })
    console.log(resultData)
    return resultData
  } catch (error) {
    console.log("The error happened")
    throw error
  }
}
