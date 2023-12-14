import { BSON } from "realm-web"
import { ProductSchema } from "#/lib/schema/def/product"
import { SchemaObject } from "../format"
export type OrderSchema = {
  _id: BSON.ObjectID
  customerId: string
  orderTime: Date
  transitionId: BSON.ObjectID
  paymentMethod: string
  products: Array<ProductSchema>
}
const Order: SchemaObject<"Order", keyof OrderSchema> = {
  name: "Order",
  properties: {
    _id: {
      name: "_id",
      dataType: "objectId",
      indexed: true,
      optional: false,
      mapTo: "_id",
      roleType: "select",
    },
    customerId: {
      name: "customerId",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "customerId",
      roleType: "select",
    },

    orderTime: {
      name: "orderTime",
      dataType: "date",
      indexed: false,
      optional: false,
      mapTo: "orderTime",
      roleType: "select",
    },
    paymentMethod: {
      name: "paymentMethod",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "paymentMethod",
      roleType: "select",
    },
    transitionId: {
      name: "transitionId",
      dataType: "objectId",
      indexed: false,
      optional: false,
      mapTo: "transitionId",
      roleType: "select",
    },
    products: {
      name: "products",
      dataType: "list",
      objectType: "Product",
      indexed: false,
      optional: false,
      mapTo: "products",
      roleType: "select",
    },
  },
  primaryKey: "_id",
  embedded: false,
}

export default Order
