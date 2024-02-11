import { getCookieByName } from "#/components/util/cookie"

import { ApolloError, gql } from "@apollo/client"
import { createClient } from "../apolloClient"
import {
  CategoryGqlInsert,
  CategoryGqlQuery,
  CategorySchema,
} from "#/lib/schema/def/category"

export const QUERY_CATEGORIES = gql`
  query queryCategories($query: CategoryQueryInput) {
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
): Promise<CategoryGqlQuery[]> {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const {
      data: { categories },
    } = await client.query({
      query: QUERY_CATEGORIES,
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

export const INSERT_CATEGORY = gql`
  mutation insertCategory($newCategory: CategoryInsertInput!) {
    insertOneCategory(data: $newCategory) {
      _id
      name
    }
  }
`

export async function insertCategory(variables: CategoryGqlInsert): Promise<{
  categories: Partial<Record<keyof CategorySchema, unknown>>[]
}> {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const { data } = await client.mutate({
      mutation: QUERY_CATEGORIES,
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
