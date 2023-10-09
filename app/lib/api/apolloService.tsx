// 1. Function to create GraphQL client//"https://realm.mongodb.com/api/client/v2.0/app/application-parking-apwzf/graphql",
// TODO type for token "https://main--time-pav6zq.apollographos.net/graphql",
//TODO unused code
/* const getByNameAndFilterGql = (name: string) => {
  return gql`
    query getByNameAndFilter{
      ${name}{
        name
      }
    }
  `
} 
export async function getByName(token: string, name: string, filter?: GqlFilter) {
  //console.log(`The cookie at server side ${cookies().get('accessToken')?.value}`)
  const client = createClient(getCookieByName("accessToken")!);
  console.log("Important",getByNameAndFilterGql(name))
  const {
    data
  } = await client.query({
    query: getByNameAndFilterGql(name),

  });
  return data
}
export async function getByNameAndFilter(token: string, name: string) {
  const client = createClient(getCookieByName("accessToken")!)
  console.log("Important", getByNameAndFilterGql(name))
  const { data } = await client.query({
    query: getByNameAndFilterGql(name),
  })
  return data
} 
*/
