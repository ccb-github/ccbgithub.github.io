import { BSON } from "realm-web"
import { SchemaObject } from "../format"

type StockSchema = {
  _id: BSON.ObjectID
  address: string
  name: string
}
const Stock: SchemaObject<"Stock", keyof StockSchema> = {
  name: "Stock",
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
    name: {
      name: "name",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "name",
      roleType: "normal",
    },
  },
  primaryKey: "_id",
  embedded: false,
}

export default Stock
