import type { SchemaObject } from "#/types/schema";

const Order: SchemaObject = {
  name: "Order",
  properties: {
  _id: {
    name: "_id",
    dataType: "objectId",
    indexed: true,
    optional: false,
    mapTo: "_id",
  },
  customerId: {
    name: "customerId",
    dataType: "string",
    indexed: false,
    optional: false,
    mapTo: "customerId",
  },
  orderTime: {
    name: "orderTime",
    dataType: "date",
    indexed: false,
    optional: false,
    mapTo: "orderTime",
  },
  products: {
    name: "products",
    dataType: "list",
    objectType: "Product",
    indexed: false,
    optional: false,
    mapTo: "products",
  },
  },
  primaryKey: "_id",
  embedded: false,
}

export default Order