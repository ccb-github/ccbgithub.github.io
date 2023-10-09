import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { cookies } from "next/headers"

export const createClient = (token: string) => {
  console.log(`Just mask ${token}`)

  //console.log(token, new Date().toISOString())
  // const app = new Realm.App("application-qrcode-ukplu")
  // console.log(app.currentUser?.accessToken)
  const accessToken = cookies().get("accessToken")?.value
  console.group()
  console.log("The accessToken to create client", accessToken)

  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      headers: {
        //Authorization: `Bearer ${accessToken}`,
        apiKey:
          "iVVHV8u9cUVQU776WAt331CNu0TSFxmjjIeyRQnbm9JJtPwWR46CMvf1AJQaAAyA",
      },
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  })
}
