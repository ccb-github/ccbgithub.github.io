import { gql } from "@apollo/client";

export const QUERY_REGULATORY = gql`
  query queryRegulatory($query: RegulatoryQueryInput) {
    regulatory(query: $query) {
      _id
      name
      creditCode
      address
      description
    }
  }
`

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

export const FIND_REGULATORIES = gql`
  query findRegulatories($query: RegulatoryQueryInput) {
    regulatories(query: $query) {
      _id
      name
      creditCode
      address
      description
    }
  }
`
