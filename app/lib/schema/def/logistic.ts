import { NormalSchemaObject } from "#/lib/schema/format"

const Logistic: NormalSchemaObject = {
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
