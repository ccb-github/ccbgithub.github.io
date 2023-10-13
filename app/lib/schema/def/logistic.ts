import { SchemaObject } from "#/lib/schema/format"

const Logistic: SchemaObject = {
  name: "Logistic",
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

export default Logistic
