import categorySchema, { CategorySchema } from "#/lib/schema/def/category"
import Checker from "#/lib/schema/def/checker"
import enterpriseSchema, { EnterpriseSchema } from "#/lib/schema/def/enterprise"
import productSchema, { ProductSchema } from "#/lib/schema/def/product"
import regulatorySchema, {
  type RegulatorySchema,
} from "#/lib/schema/def/regulatory"
import checkRecordSchema from "#/lib/schema/def/checkRecord"
import Stock from "#/lib/schema/def/stock"
import Order, { OrderSchema } from "#/lib/schema/def/order"
import Logistic from "#/lib/schema/def/logistic"
import {
  EmbedSchemaObject,
  EmbeddedSchemaName,
  NormalSchemaName,
  NormalSchemaObject,
} from "./format"

export type NormalSchemaJson = {
  [key in NormalSchemaName]: NormalSchemaObject
}
export type EmbeddedSchemaJson = {
  [key in EmbeddedSchemaName]: EmbedSchemaObject<string>
}

export const normalSchemaJson: NormalSchemaJson = {
  Category: categorySchema,
  Checker,
  CheckRecord: checkRecordSchema,
  Enterprise: enterpriseSchema,
  Product: productSchema,
  Regulatory: regulatorySchema,
  Order,
  Stock,
  Logistic,
}

export type SchemaTypeMapper = {
  Category: CategorySchema
  Enterprise: EnterpriseSchema
  Product: ProductSchema
  Order: OrderSchema
  Regulatory: RegulatorySchema
}
