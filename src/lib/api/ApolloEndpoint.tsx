import { SchemaName } from "#/types/schema";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

// 1. Function to create GraphQL client//"https://realm.mongodb.com/api/client/v2.0/app/application-parking-apwzf/graphql", 
//TODO type for token "https://main--time-pav6zq.apollographos.net/graphql", 
export const createClient = 
  (token: any) =>
    new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT ,
        headers: {
          apiKey: '6g6eYgqZ9MoXhJFC7CHeTQpUWYXIJx4bQ0LIv8bQ2ubaCCE0vk3y8KxGiOln1jAr', 
          //'FO2sYjxQlDWD0Zwqk5FCq2qQx8dAwR3KB9KhyrV1BCZhuUzHvC2dHSwclfQuepwd',
          
        },
      }),
      cache: new InMemoryCache(),
      ssrMode: true,
    });

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

// 3. GraphQL Query used in SSR TheProduct($name: String!)
//Query wrapper
const GET_PRODUCT = gql`
  query getProduct{
    catgory{
      name
    }
  }
`;


// ,
//     {
//       method: "POST",
//       body: JSON.stringify({
//         query: '{ now(id: "1") }',
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }

const GET_RECORD = gql`
  query getCatgory{
    records{
      code{
        value
      }
    }
  }
`;

const GET_ALLPRODUCTS = gql`
  query {
    product{
      name
    }
  }
`

// export async function getAllProducts() {
  
//   const client = createClient("placeholder");
//   const {
//     data
//   } = await client.query({
//     query: GET_ALLPRODUCTS
//   });
//   console.log(`The data in the query function ${JSON.stringify(data)}`)
//   return data
// }

export async function getOneProduct() {
  
  const client = createClient("placeholder");
  const {
    data
  } = await client.query({
    query: GET_PRODUCT,
    // variables: {
    //   role: "customer"
    // }
  });
  console.log(`The data in the query function ${JSON.stringify(data)}`)
  return data
}

const gqlGetByName = (name: string) => gql`
  query {
    ${name} {
      _id
      name
    }
  }
`
const GET_ENTERPRISE = gql`query OneProduct{product{name}}`
const gqlGetByNameAndFilter = (name: SchemaName, filter) => {
  const gqlFilter = {}
  //Object.keys(filter).
  return gql`
    query getByNameAndFilter($name){
      ${name}(${filter.keyName}: $${filter.keyName}){
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
async function getByNameAndFilter(name: string, filter?: GqlFilter) {
  //console.log(`The cookie at server side ${cookies().get('accessToken')?.value}`)
  const client = createClient("placeholder");
  console.log("Important",gqlGetByNameAndFilter(name, filter))
  const {
    data
  } = await client.query({
    query: gqlGetByNameAndFilter(name, filter),
    variables: {
      name: "Product a"
    }
  });
  return data
}