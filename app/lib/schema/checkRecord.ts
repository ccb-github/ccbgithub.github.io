import { SchemaObject } from "#/types/schema"

const CheckRecord: SchemaObject = {
  embedded: false,
  name: "CheckRecord",
  primaryKey: "_id",
  properties: {
    _id: {
      indexed: true,
      mapTo: "_id",
      name: "_id",
      optional: false,
      dataType: "objectId",
    },
    device: {
      indexed: false,
      mapTo: "device",
      name: "device",
      optional: false,
      dataType: "string",
    },
    target: {
      name: "target",
      dataType: "select",
      objectType: "Product",
      indexed: false,
      optional: false,
      mapTo: "target",
    },
    method: {
      indexed: false,
      mapTo: "method",
      name: "method",
      optional: true,
      dataType: "string",
    },
    name: {
      indexed: false,
      mapTo: "name",
      name: "name",
      optional: false,
      dataType: "string",
    },
    operator: {
      indexed: false,
      mapTo: "operator",
      name: "operator",
      objectType: "Checker",
      optional: true,
      dataType: "object",
    },
    result: {
      indexed: false,
      mapTo: "result",
      name: "result",
      optional: false,
      dataType: "string",
    },
  },
}

export default CheckRecord
