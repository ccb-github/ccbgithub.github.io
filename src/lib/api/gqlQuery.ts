import { gql } from "@apollo/client";

export const GET_ALL_CATGORY = gql`
  query getAllCatgory{
    catgories{
      name
    }
  }
`;



export const GET_RECORDS = gql`
  query getRecords{
    records{
      code{
        value
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query allProducts{
    products{
      name,
      assemblePlace
    }
  }
`

export const GET_ONE_PRODUCT = gql`
  query getOneProduct{
    product{
      _id,
      name,
      assemblePlace
    }
  }
`

export const GET_CHECKERS = gql`
  query getCheckers {
    checkers {
      _id
      address
      belong
      email
      name
    }
  }
`;