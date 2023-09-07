import { SchemaObject } from "#/types/schema"

const Enterprise : SchemaObject = {
  name: "Enterprise",
  properties: {
    _id: {
      name: "_id",
      type: "objectId",
      indexed: true,
      optional: false,
      mapTo: "_id",
    },
    address: {
      name: "address",
      type: "string",
      indexed: false,
      optional: true,
      mapTo: "address",
    },
    createdAt: {
      name: "createdAt",
      type: "date",
      indexed: false,
      optional: false,
      mapTo: "createdAt",
    },
    creditCode: {
      name: "creditCode",
      type: "string",
      indexed: false,
      optional: false,
      mapTo: "creditCode",
    },
    description: {
      name: "description",
      type: "string",
      indexed: false,
      optional: false,
      mapTo: "description",
    },
    email: {
      name: "email",
      type: "string",
      indexed: false,
      optional: true,
      mapTo: "email",
    },
    name: {
      name: "name",
      type: "string",
      indexed: false,
      optional: true,
      mapTo: "name",
    },
    registerPlace: {
      name: "registerPlace",
      type: "string",
      indexed: false,
      optional: false,
      mapTo: "registerPlace",
    },
    tradeMark: {
      name: "tradeMark",
      type: "string",
      indexed: false,
      optional: true,
      mapTo: "tradeMark",
    },
    ownerId: {
      name: "ownerId",
      type: "string",
      indexed: false,
      optional: false,
      mapTo: "ownerId",
    },
  },
  primaryKey: "_id",
  embedded: false,
}
export default Enterprise