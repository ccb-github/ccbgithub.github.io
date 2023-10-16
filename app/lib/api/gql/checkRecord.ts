import { getCookieByName } from "#/components/util/cookie"
import { ApolloError, gql } from "@apollo/client"
import { createClient } from "../apolloClient"

export const QUERY_CHECK_RECORDS = gql`
  query queryCheckRecords($query: CheckRecordQueryInput) {
    checkRecords(query: $query) {
      _id
      device
      method
      target
      # Related products
    }
  }
`
export async function queryCheckRecords() {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const {
      data: { checkRecords },
    } = await client.query({
      query: QUERY_CHECK_RECORDS,
    })
    console.groupEnd()
    return checkRecords
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const INSERT_CHECK_RECORD = gql`
  mutation insertCheckRecord($newCheckRecord: CheckRecordInsertInput!) {
    insertOneCheckRecord(data: $newCheckRecord) {
      _id
    }
  }
`

export async function insertCheckRecord(
  newCheckRecord: Partial<Record<keyof Check>>,
) {
  //apollo client
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const { data } = await client.mutate({
      mutation: INSERT_CHECK_RECORD,
      variables: { newCheckRecord },
    })
    console.groupEnd()
    return data
  } catch (error) {
    switch (Array.isArray(error)) {
      case true:
        // eslint-disable-next-line prettier/prettier
        (error as unknown[]).map((eachError) => {
          console.error(eachError)
        })
        break
      case false:
        console.error(error)
        break
    }
    console.table(error as ApolloError)
    throw error
  }
}
