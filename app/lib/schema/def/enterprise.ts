import { NormalSchemaObject } from "#/lib/schema/format"
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
export const enterpriseSchema: NormalSchemaObject<keyof EnterpriseSchema> = {
  name: "Enterprise",
  properties: {
    _id: {
      name: "_id",
      dataType: "objectId",
      indexed: true,
      optional: false,
      mapTo: "_id",
    },
    address: {
      name: "address",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "address",
    },
    createdAt: {
      name: "createdAt",
      dataType: "date",
      indexed: false,
      optional: false,
      mapTo: "createdAt",
    },
    creditCode: {
      name: "creditCode",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "creditCode",
    },
    description: {
      name: "description",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "description",
    },
    email: {
      name: "email",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "email",
    },
    name: {
      name: "name",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "name",
    },
    registerPlace: {
      name: "registerPlace",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "registerPlace",
    },
    tradeMark: {
      name: "tradeMark",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "tradeMark",
    },
    ownerId: {
      name: "ownerId",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "ownerId",
    },
  },
  primaryKey: "_id",
  embedded: false,
}
export default enterpriseSchema
