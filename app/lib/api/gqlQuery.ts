import { gql } from "@apollo/client";

export const GET_ALL_CATGORY = gql`
  query getAllCatgory {
    catgories {
      name
    }
  }
`;
// _id;
// address;

// createdAt;

// creditCode;

// description;

// email;

// name;

// registerPlace;

// tradeMark;
export const GET_ALL_ENTERPRISE = gql`
  query getAllEnterprise {
    catgory {
      name
    }
  }
`;

export const GET_RECORDS = gql`
  query getRecords {
    records {
      code {
        value
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query allProducts {
    products {
      _id
      name
      assemblePlace
      catgory
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query allOrders {
    orders{
      customerId,
      orderTime,
      products{
        name
      }
      # Related products
    }
  }
`;

export const GET_ONE_PRODUCT = gql`
  query getOneProduct {
    product {
      _id
      name
      assemblePlace
    }
  }
`;

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
