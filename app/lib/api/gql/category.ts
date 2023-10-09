import { getCookieByName } from "#/components/util/cookie"
import { type SchemaResultMapper } from "#/types/schema"
import { ApolloError, gql } from "@apollo/client"
import { createClient } from "../apolloClient"

export const GET_CATGORIES = gql`
  query getAllCatgories($query: CategoryQueryInput) {
    categories(query: $query) {
      _id
      name
      createdAt
      description
    }
  }
`

export async function getCategories(): Promise<{
  categories: SchemaResultMapper["Category"][]
}> {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const { data } = await client.query({
      query: gql`
        query getCategories {
          categories {
            _id
            name
            description
          }
        }
      `,
    })
    return data
  } catch (error) {
    if (error instanceof ApolloError) {
      error.clientErrors.length > 0 ? console.error(error.clientErrors) : null
      error.networkError ? console.table(error.networkError) : null
    } else {
      console.error("Unknown type error")
    }
    console.error(error)
    throw error
  }
}
