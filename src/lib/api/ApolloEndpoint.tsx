import { SchemaName } from "#/types/schema";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "./gqlQuery";

// 1. Function to create GraphQL client//"https://realm.mongodb.com/api/client/v2.0/app/application-parking-apwzf/graphql", 
//TODO type for token "https://main--time-pav6zq.apollographos.net/graphql", 
export const createClient = (token: string) => { 
    console.log(`Create client ${token}`)
    return( 
      new ApolloClient({
        link: new HttpLink({
          uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT ,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }),
        cache: new InMemoryCache(),
        ssrMode: true,
      })
    )
  }
// const GQL_QUERY_NOW =  gql`query Now {
//     now(id: "1")
// }`;
// export async function gqlQueryNow(){
//   const client = createClient("placeholder");
//   const {
//     data
//   } = await client.query({
//     query: GQL_QUERY_NOW
//   });
//   return data
// }





export async function getOneProduct(token: string) {
  
  const client = createClient(token);
  const {
    data
  } = await client.query({
    query: GET_ONE_PRODUCT,
  });
  console.log(`The data in the query function ${JSON.stringify(data)}`)
  return data
}

export async function getByName(token: string, name: string) {
  
  const client = createClient(token);
  const {
    data
  } = await client.query({
    query: getByNameGql(name)
  });
  console.log(data.length)
  return data
}

export async function getAllProducts(token: string) {
  
  const client = createClient(token);
  const {
    data
  } = await client.query({
    query: GET_ALL_PRODUCTS,
   
  });
  console.log(data.length)
  return data
}

const getByNameGql = (name: string) => gql`
  query {
    ${name} {
      _id
      name
    }
  }
`
const GET_ONE_PRODUCT = gql`
  query OneProduct{
    product{
      name
    }
  }`
  //
const getByNameAndFilterGql = (name: string) => {
  return gql`
    query getByNameAndFilter{
      ${name}{
        name
      }
    }
  `
}



const UPDATE_PRODUCT_NAME = gql`
  mutation UpdateProductName($newName: String!) {
    updateOneProduct(query: { name_lt: "Product" }, set: { name: $newName }) {
      name
      assemlePlace
    }
  }
`
// 4. Server-side logic to parse cookie and run query
// export async function getUsers(authToken?: RequestCookie | undefined) {
//   //console.log(`The cookie at server side ${cookies().get('accessToken')?.value}`)
//   const client = createClient("placeholder");
//   const {
//     data
//   } = await client.query({
//     query: GET_ALLPRODUCTS,
//     // mutation: UPDATE_PRODUCT_NAME,
//     variables: {
//       name:"Product a"
//     }
//   });
//   return data
// }

// export async function getEnterprise() {
  
//   const client = createClient("placeholder");
//   const {
//     data
//   } = await client.query({
//     query: GET_ENTERPRISE
//   });
//   console.log(`The data in the query function ${JSON.stringify(data)}`)
//   return data
// }

// export async function getByName(name: string) {
//   //console.log(`The cookie at server side ${cookies().get('accessToken')?.value}`)
//   const client = createClient("placeholder");
//   const {
//     data
//   } = await client.query({
//     query: gqlGetByName(name),
    
//   });
//   return data
// }


//TODO type the filter
type GqlFilter = any
// export async function getByName(token: string, name: string, filter?: GqlFilter) {
//   //console.log(`The cookie at server side ${cookies().get('accessToken')?.value}`)
//   const client = createClient(token);
//   console.log("Important",getByNameAndFilterGql(name))
//   const {
//     data
//   } = await client.query({
//     query: getByNameAndFilterGql(name),

//   });
//   return data
// }

export async function getByNameAndFilter(token: string, name: string, filter?: GqlFilter) {
  //console.log(`The cookie at server side ${cookies().get('accessToken')?.value}`)
  const client = createClient(token);
  console.log("Important",getByNameAndFilterGql(name))
  const {
    data
  } = await client.query({
    query: getByNameAndFilterGql(name),

  });
  return data
}