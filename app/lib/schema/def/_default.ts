import { BSON } from "realm-web"
import { type SchemaObject } from "#/lib/schema/format"

/**
 * @description The data model of category collection
 * category stands for the category of the product
 */
export type TypeDefaultSchema = {
  _id: BSON.ObjectID
}

/**
 * @param {TypeDefaultSchema} Derive from categorySchema
 */
const typeDefaultSchema: SchemaObject<"TypeDefault", keyof TypeDefaultSchema> =
  {
    name: "TypeDefault",
    // dataType: "selectList",
    properties: {
      _id: {
        name: "_id",
        dataType: "objectId",
        indexed: true,
        optional: false,
        mapTo: "_id",
      },
    },
    primaryKey: "_id",
    embedded: false,
  }

export default typeDefaultSchema
