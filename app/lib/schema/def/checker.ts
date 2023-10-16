import { NormalSchemaObject } from "#/lib/schema/format"

const Checker: NormalSchemaObject<"_id" | "address"> = {
  name: "Checker",
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
      defaultValue: "Default address",
      indexed: false,
      optional: true,
      mapTo: "address",
    },
    belong: {
      name: "belong",
      dataType: "object",
      objectType: "Regulatory",
      indexed: false,
      optional: true,
      mapTo: "belong",
    },
    email: {
      name: "email",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "email",
    },
    name: {
      name: "name",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "name",
    },
  },
  primaryKey: "_id",
  embedded: false,
}

export default Checker
