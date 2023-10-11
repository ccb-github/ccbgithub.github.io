import { getCookieByName } from "#/components/util/cookie"
import { type SchemaResultMapper } from "#/types/schema"
import { ApolloError, gql } from "@apollo/client"
import { createClient } from "../apolloClient"
import { CategoryGqlQuery } from "#/lib/schema/category"

export const QUERY_CATGORIES = gql`
  query queryCatgories($query: CategoryQueryInput) {
    categories(query: $query) {
      _id
      createdAt
      description
      name
    }
  }
`

export async function queryCategories(
  variables?: CategoryGqlQuery,
): Promise<SchemaResultMapper["Category"][]> {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const {
      data: { categories },
    } = await client.query({
      query: QUERY_CATGORIES,
      variables,
    })
    return categories
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

export const INSERT_CATGORIES = gql`
  mutation insertCatgory($newCategory: CategoryInsertInput!) {
    insertOneCategory(data: $newCategory) {
      _id
      name
    }
  }
`

export async function insertCategory(variables: CategoryGqlQuery): Promise<{
  categories: SchemaResultMapper["Category"][]
}> {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const { data } = await client.mutate({
      mutation: QUERY_CATGORIES,
      variables,
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