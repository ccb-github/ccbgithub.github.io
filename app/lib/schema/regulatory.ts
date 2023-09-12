import { SchemaObject } from "#/types/schema"

const Regulatory: SchemaObject = {
  name: "Regulatory",
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
      optional: true,
      mapTo: "name",
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

export default Regulatory