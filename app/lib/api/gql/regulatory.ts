import { RegulatorySchema, SchemaResultMapper } from "#/types/schema"
import { gql } from "@apollo/client"
import { createClient } from "../apolloClient"
import { getCookieByName } from "#/components/util/cookie"

export const UPDATE_REGULATORIES = gql`
  mutation updateRegulatories(
    $query: RegulatoryQueryInput!
    $set: RegulatoryUpdateInput!
  ) {
    updateManyRegulatories(query: $query, set: $set) {
      matchedCount
      modifiedCount
    }
  }
`
export async function updateRegulatories({
  query,
  set,
}: {
  query?: Partial<SchemaResultMapper["Regulatory"]>
  set?: Partial<SchemaResultMapper["Regulatory"]>
}): Promise<{ regulatories: SchemaResultMapper["Regulatory"] }> {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const { data } = await client.mutate({
      mutation: UPDATE_REGULATORIES,
      variables: {
        query,
        set,
      },
    })
    return data
  } catch (error) {
    console.log("The error happened")
    throw error
  }
}

export const QUERY_REGULATORIES = gql`
  query queryRegulatories($query: RegulatoryQueryInput) {
    regulatories(query: $query) {
      _id
      name
      creditCode
      address
      description
    }
  }
`

export async function queryRegulatories({
  query,
}: {
  query?: Partial<SchemaResultMapper["Regulatory"]>
}): Promise<
  readonly (Partial<Record<keyof RegulatorySchema, string>> & { _id: string })[]
> {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const {
      data: { regulatories },
    } = await client.query({
      query: QUERY_REGULATORIES,
      variables: {
        query,
      },
    })
    return regulatories
  } catch (error) {
    console.log("The error happened")
    throw error
  }
}
