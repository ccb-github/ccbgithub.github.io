import { BSON } from "realm-web"
import { EnterpriseSchema } from "#/lib/schema/def/enterprise"
import { SchemaObject } from "../format"

export type ProductStatus = "Selling" | "Sold" | "Ordering"
export type SchemaShape<SchemaPropKey extends string> = {
  [key in SchemaPropKey]: BSON.ObjectID | string | number | SchemaShape<string>
}
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
export const productSchemaJson: SchemaObject<"Product", keyof ProductSchema> = {
  name: "Product",
  properties: {
    _id: {
      name: "_id",
      dataType: "objectId",
      roleType: "normal",
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
      roleType: "normal",
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
      roleType: "normal",
    },
    name: {
      name: "name",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "name",
      roleType: "normal",
    },
    ownerId: {
      name: "ownerId",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "ownerId",
      roleType: "normal",
    },
    status: {
      name: "status",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "status",
      roleType: "normal",
    },
    produceDay: {
      name: "produceDay",
      dataType: "date",
      indexed: false,
      optional: false,
      mapTo: "produceDay",
      roleType: "normal",
    },
    shelfLife: {
      name: "shelfLife",
      dataType: "int",
      indexed: false,
      optional: false,
      mapTo: "shelfLife",
      roleType: "normal",
    },
    standard: {
      name: "standard",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "standard",
      roleType: "normal",
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
