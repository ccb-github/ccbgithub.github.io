import categorySchema, { CategorySchema } from "./def/category"
import Checker from "./def/checker"
import enterpriseSchemaJson, { EnterpriseSchema } from "./def/enterprise"
import productSchemaJson, { ProductSchema } from "./def/product"
import regulatorySchemaJson, { RegulatorySchema } from "./def/regulatory"
import checkRecordSchema from "./def/checkRecord"
import Stock from "./def/stock"
import Order, { OrderSchema } from "./def/order"
import Logistic from "./def/logistic"
import typeDefaultSchema from "./def/_default"

export const normalSchemaJson = {
  Category: categorySchema,
  Checker,
  CheckRecord: checkRecordSchema,
  Enterprise: enterpriseSchemaJson,
  Product: productSchemaJson,
  Regulatory: regulatorySchemaJson,
  Order,
  Stock,
  Logistic,
  TypeDefault: typeDefaultSchema,
}

export type SchemaTypeMapper = {
  Category: CategorySchema
  Enterprise: EnterpriseSchema
  Product: ProductSchema
  Order: OrderSchema
  Regulatory: RegulatorySchema
}
