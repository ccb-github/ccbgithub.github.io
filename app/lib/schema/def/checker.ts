import { BSON } from "realm-web"

import { SchemaObject } from "#/lib/schema/format"
import { RegulatorySchema } from "./regulatory"
export type CheckerSchema = {
  _id: BSON.ObjectID
  address: string
  belong: RegulatorySchema
  email: string
  name: string
}
const Checker: SchemaObject<"Checker", keyof CheckerSchema> = {
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
      relationSchemaName: "Regulatory",
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
