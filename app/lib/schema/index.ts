import categorySchema, { CategorySchema } from "#/lib/schema/def/category"
import Checker from "#/lib/schema/def/checker"
import enterpriseSchema, { EnterpriseSchema } from "#/lib/schema/def/enterprise"
import productSchemaObject, { ProductSchema } from "#/lib/schema/def/product"
import regulatorySchema, {
  type RegulatorySchema,
} from "#/lib/schema/def/regulatory"
import checkRecordSchema from "#/lib/schema/def/checkRecord"
import Stock from "#/lib/schema/def/stock"
import Order, { OrderSchema } from "#/lib/schema/def/order"
import Logistic from "#/lib/schema/def/logistic"
import type {
  EmbedSchemaObject,
  EmbeddedSchemaName,
  NormalSchemaName,
  NormalSchemaObject,
} from "./format"

export type NormalSchemaMap = {
  [key in NormalSchemaName]: NormalSchemaObject
}
export type EmbeddedSchemaMap = {
  [key in EmbeddedSchemaName]: EmbedSchemaObject<string>
}

export const normalSchemaMap: NormalSchemaMap = {
  Category: categorySchema,
  Checker,
  CheckRecord: checkRecordSchema,
  Enterprise: enterpriseSchema,
  Product: productSchemaObject,
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
} & Record<keyof NormalSchemaMap, Record<string, unknown>>
