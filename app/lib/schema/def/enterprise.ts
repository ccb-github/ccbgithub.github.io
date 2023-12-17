import { SchemaObject } from "#/lib/schema/format"
import { BSON } from "realm-web"

export type EnterpriseSchema = {
  _id: BSON.ObjectID
  address?: string
  createdAt: Date
  creditCode: string
  description: string
  email?: string
  name?: string
  ownerId: string
  registerPlace: string
  tradeMark?: string
}
export const enterpriseSchemaJson: SchemaObject<
  "Enterprise",
  keyof EnterpriseSchema
> = {
  name: "Enterprise",
  properties: {
    _id: {
      name: "_id",
      dataType: "objectId",
      indexed: true,
      optional: false,
      mapTo: "_id",
      roleType: "select",
    },
    address: {
      name: "address",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "address",
      roleType: "select",
    },
    createdAt: {
      name: "createdAt",
      dataType: "date",
      indexed: false,
      optional: false,
      mapTo: "createdAt",
      roleType: "select",
    },
    creditCode: {
      name: "creditCode",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "creditCode",
      roleType: "select",
    },
    description: {
      name: "description",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "description",
      roleType: "select",
    },
    email: {
      name: "email",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "email",
      roleType: "select",
    },
    name: {
      name: "name",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "name",
      roleType: "select",
    },
    registerPlace: {
      name: "registerPlace",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "registerPlace",
      roleType: "select",
    },
    tradeMark: {
      name: "tradeMark",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "tradeMark",
      roleType: "select",
    },
    ownerId: {
      name: "ownerId",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "ownerId",
      roleType: "select",
    },
  },
  primaryKey: "_id",
  embedded: false,
}
export default enterpriseSchemaJson
