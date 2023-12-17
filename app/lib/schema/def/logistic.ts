import { SchemaObject } from "#/lib/schema/format"
import { type BSON } from "realm-web"

export type LogisticSchema = {
  _id: BSON.ObjectID
}
const Logistic: SchemaObject<"Logistic", keyof LogisticSchema> = {
  name: "Logistic",
  properties: {
    _id: {
      name: "_id",
      dataType: "objectId",
      indexed: true,
      optional: false,
      mapTo: "_id",
      roleType: "select",
    },
  },
  primaryKey: "_id",
  embedded: false,
}

export default Logistic
