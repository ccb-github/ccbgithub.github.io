import { SchemaObject } from "#/lib/schema/format"
import { BSON } from "realm-web"
export type RegulatorySchema = {
  _id: BSON.ObjectID
  name: string
  address: string
  description: string
  ownerId: string
}
export const regulatorySchemaJson: SchemaObject<
  "Regulatory",
  keyof RegulatorySchema
> = {
  name: "Regulatory",
  properties: {
    _id: {
      name: "_id",
      dataType: "objectId",
      indexed: true,
      optional: false,
      mapTo: "_id",
      roleType: "normal",
    },
    address: {
      name: "address",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "address",
      roleType: "normal",
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
      optional: true,
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
  },
  primaryKey: "_id",
  embedded: false,
}

export default regulatorySchemaJson
