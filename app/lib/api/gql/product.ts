import { gql } from "@apollo/client";

export const FIND_PRODUCTS = gql`
  query findProducts {
    products {
      _id
      name
      assemblePlace
      category
      status
      produceDay
      shelfLife
    }
  }
`;

export const GET_ONEPRODUCT_BY_ID = gql`
  query getOneProduct($id: ObjectId){
    product(query: {
      _id: $id
    }){
      _id
      name
      assemblePlace
      description
      status
      category
      shelfLife
    }
  }
`;

export const FIND_PRODUCT = gql`
  query findProduct($query: ProductQueryInput){
    product(query: $query){
      _id
      name
      assemblePlace
      description
      status
      category
      shelfLife
    }
  }
`;

export const UPDATE_PRODUCT_NAME = gql`
  mutation UpdateProductName($newName: String!) {
    updateOneProduct(query: { name_lt: "Product" }, set: { name: $newName }) {
      name
      assemlePlace
    }
  }
`

