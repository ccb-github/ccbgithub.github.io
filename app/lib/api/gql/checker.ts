import { gql } from "@apollo/client"

export const QUERY_CHECKERS = gql`
  query queryCheckers {
    checkers {
      _id
      address
      belong {
        name
      }
      email
      name
    }
  }
`
