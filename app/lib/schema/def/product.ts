import { BSON } from "realm-web"
import { NormalSchemaObject } from "#/lib/schema/format"
import { EnterpriseSchema } from "#/lib/schema/def/enterprise"

export type ProductStatus = "Selling" | "Sold" | "Ordering"
export type ProductSchema = {
  _id: BSON.ObjectID
  assemblePlace?: string
  category: string
  description: string
  name: string
  ownerId: string
  produceDay: Date
  producer?: EnterpriseSchema
  shelfLife: number
  standard: string
  status: string
}
export const productSchemaJson: NormalSchemaObject<keyof ProductSchema> = {
  name: "Product",
  properties: {
    _id: {
      name: "_id",
      dataType: "objectId",
      indexed: true,
      optional: false,
      mapTo: "_id",
    },
    assemblePlace: {
      name: "assemblePlace",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "assemblePlace",
    },
    category: {
      name: "category",
      roleType: "select",
      dataType: "objectId",
      objectType: "Category",
      relationSchemaName: "Category",
      indexed: false,
      optional: false,
      mapTo: "category",
    },
    description: {
      name: "description",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "description",
    },
    name: {
      name: "name",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "name",
    },
    ownerId: {
      name: "ownerId",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "ownerId",
    },
    status: {
      name: "status",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "status",
    },
    produceDay: {
      name: "produceDay",
      dataType: "date",
      indexed: false,
      optional: false,
      mapTo: "produceDay",
    },
    shelfLife: {
      name: "shelfLife",
      dataType: "int",
      indexed: false,
      optional: false,
      mapTo: "shelfLife",
    },
    standard: {
      name: "standard",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "standard",
    },
    producer: {
      name: "producer",
      dataType: "objectId",
      roleType: "select",
      objectType: "Enterprise",
      relationSchemaName: "Enterprise",
      indexed: false,
      optional: true,
      mapTo: "producer",
    },
  },
  primaryKey: "_id",
  embedded: false,
}

export default productSchemaJson
