import { SchemaObject } from "#/types/schema"
import { BSON } from "realm-web"

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

export type CategoryGqlResult = Partial<
  Record<keyof CategorySchema, unknown>
> & {
  _id: string
}

const Category: SchemaObject = {
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

export default Category
