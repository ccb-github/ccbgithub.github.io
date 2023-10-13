import { getCookieByName } from "#/components/util/cookie"

import { ApolloError, gql } from "@apollo/client"
import { createClient } from "../apolloClient"
import { BSON } from "realm-web"
import { ProductSchema } from "#/lib/schema/def/product"

const QUERY_PRODUCTS = gql`
  query queryProducts($query: ProductQueryInput) {
    products(query: $query) {
      _id
      name
      assemblePlace
      description
      status
      shelfLife
    }
  }
`
export async function queryProducts() {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    console.log(
      "Accesstoken of the created client",
      getCookieByName("accessToken"),
    )
    console.groupEnd()
    const {
      data: { products },
    } = await client.query({
      query: QUERY_PRODUCTS,
    })
    console.log("Product length", products.length)
    return products
  } catch (error) {
    switch (Array.isArray(error)) {
      case true:
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

const UPDATE_PRODUCTS = gql`
  mutation updateProducts(
    $query: ProductQueryInput
    $set: ProductUpdateInput!
  ) {
    updateManyProducts(query: $query, set: $set) {
      matchedCount
      modifiedCount
    }
  }
`

export async function updateProducts({
  query,
  set,
}: {
  query: Partial<Record<keyof ProductSchema, unknown>>
  set: Partial<Record<keyof ProductSchema, unknown>>
}) {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const { data } = await client.mutate({
      mutation: UPDATE_PRODUCTS,
      variables: {
        query,
        set,
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.log("The error happened")
    throw error
  }
}

const QUERY_PRODUCT_BY_ID = gql`
  query queryProductById($id: ObjectId!) {
    product(query: {
      _id: $id
    }) {
      _id
      name
      assemblePlace
      description
      status
      standard
      shelfLife
    }
  }
`
export async function queryProductById({
  _id,
}: {
  _id: string
}): Promise<{ product: Partial<ProductSchema> }> {
  try {
    const client = createClient(getCookieByName("accessToken")!)
    const { data } = await client.query({
      query: QUERY_PRODUCT_BY_ID,
      variables: {
        id: new BSON.ObjectId(_id),
      },
    })
    return data
  } catch (error) {
    console.log("The error happened")
    throw error
  }
}

export const FIND_PRODUCT = gql`
  query findProduct($query: ProductQueryInput) {
    product(query: $query) {
      _id
      name
      assemblePlace
      description
      status
      category
      shelfLife
    }
  }
`

export const UPDATE_ONE_PRODUCT = gql`
  mutation UpdateOneProduct(
    $query: ProductQueryInput!
    $set: ProductUpdateInput!
  ) {
    updateOneProduct(query: $query, set: $set) {
      name
    }
  }
`
