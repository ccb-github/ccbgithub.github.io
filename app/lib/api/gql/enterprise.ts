import { gql } from "@apollo/client";

export const GET_ALL_ENTERPRISES = gql`
  query getAllEnterprises {
    enterprises {
      _id
      name
      address
      createdAt
      creditCode
      name
      registerPlace
    }
  }
`;

export const GET_ENTERPRISE_BY_ID = gql`
  query getEnterpriseById($id: ObjectId){
    enterprise(query: {_id: $id}){
      _id
      name
      address
      createdAt
      creditCode
      name
      registerPlace
    }
  }
`;