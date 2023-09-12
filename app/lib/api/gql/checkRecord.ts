import { getCookieByName } from "#/components/util/cookie"
import { ApolloError, gql } from "@apollo/client"
import { createClient } from "../apolloClient"
import { SchemaResultMapper } from "#/types/schema"

export const GET_CHECK_RECORDS = gql`
  query checkRecordsByCheckerId($query: CheckRecordQueryInput) {
    checkRecords(query: $query) {
      _id
      device

      method
      target
      # Related products
    }
  }
`

export const INSERT_CHECK_RECORD = gql`
  mutation insertCheckRecord($newCheckRecord: CheckRecordInsertInput!) {
    insertOneCheckRecord(data: $newCheckRecord) {
      _id
    }
  }
`

export async function insertCheckRecord(
  newCheckRecord: Partial<SchemaResultMapper["CheckRecord"]>,
) {
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
