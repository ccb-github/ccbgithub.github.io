import { SchemaObject } from "#/types/schema";

export type ProductStatus = "Selling" | "Sold" | "Ordering"

const Product: SchemaObject = {
  name: "Product",
  properties: {
    _id: {
      name: "_id",
      type: "objectId",
      indexed: true,
      optional: false,
      mapTo: "_id",
    },
    assemblePlace: {
      name: "assemblePlace",
      type: "string",
      indexed: false,
      optional: true,
      mapTo: "assemblePlace",
    },
    category: {
      name: "category",
      type: "select",
      objectType: "Category",
      indexed: false,
      optional: false,
      mapTo: "category",
    },
    description: {
      name: "description",
      type: "string",
      indexed: false,
      optional: false,
      mapTo: "description",
    },
    name: {
      name: "name",
      type: "string",
      indexed: false,
      optional: false,
      mapTo: "name",
    },
    ownerId: {
      name: "ownerId",
      type: "string",
      indexed: false,
      optional: false,
      mapTo: "ownerId",
    },
    status: {
      name: "status",
      type: "string",
      indexed: false,
      optional: false,
      mapTo: "status",
    },
    produceDay: {
      name: "produceDay",
      type: "date",
      indexed: false,
      optional: false,
      mapTo: "produceDay",
    },
    shelfLife: {
      name: "shelfLife",
      type: "int",
      indexed: false,
      optional: false,
      mapTo: "shelfLife",
    },
    standard: {
      name: "standard",
      type: "string",
      indexed: false,
      optional: false,
      mapTo: "standard",
    },
    producer: {
      name: "producer",
      type: "select",
      objectType: "Enterprise",
      indexed: false,
      optional: true,
      mapTo: "producer",
    },
  },
  primaryKey: "_id",
  embedded: false,
}

export default Product