import { BSON } from "realm-web"
import { NormalSchemaObject } from "#/lib/schema/format"
import MongodbList from "#/components/common/MongodbList"

/**
 * @description The data model of category collection 
 * category stands for the category of the product
 */
export type CategorySchema = {
  _id: BSON.ObjectID
  description: string
  name: string
  createdAt: Date
}
export type CategoryGqlQuery = Partial<
  Record<keyof CategorySchema, unknown>
> & {
  _id: string
}

export type CategoryGqlInsert = CategorySchema

export type CategoryGqlResult = Partial<
  Record<keyof CategorySchema, unknown>
> & {
  _id: string
}
/**
 * @param {CategorySchema} Derive from categorySchema 
 */
const categorySchema: NormalSchemaObject<keyof CategorySchema> = {
  name: "Category",
  // dataType: "selectList",
  properties: {
    _id: {
      name: "_id",
      dataType: "objectId",
      indexed: true,
      optional: false,
      mapTo: "_id",
    },
    description: {
      name: "description",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "description",
    },
    name: {
      name: "name",
      dataType: "string",
      indexed: false,
      optional: true,
      mapTo: "name",
    },
    createdAt: {
      name: "createdAt",
      dataType: "date",
      indexed: false,
      optional: false,
      mapTo: "createdAt",
    },
  },
  primaryKey: "_id",
  embedded: false,
}

export default categorySchema
