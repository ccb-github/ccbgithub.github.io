import { SchemaJson } from "#/types/schema"
import Category from "./category"
import Checker from "./checker"
import Enterprise from "./enterprise"
import Product from "./product"
import Regulatory from "./regulatory"
import CheckRecord from "./checkRecord"
import Stock from "./stock"
import Order from "./order"
import Logistic from "./logistic"

export const schemaJson: SchemaJson = {
  Category,
  Checker,
  CheckRecord,
  Enterprise,
  Product,
  Regulatory,
  Order,
  Stock,
  Logistic,
}
