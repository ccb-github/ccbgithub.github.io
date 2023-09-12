import { type BSON } from "realm-web"
// TODO with different shape
export interface SchemaProperties<DefaultValue = string> {
  defaultValue?: DefaultValue
  min?: number
  name: string
  optional: boolean
  type: PropType
  indexed: boolean
  mapTo: string
  objectType?: SchemaName
}
// TODO keep two field exclusive
type PropType =
  | "double"
  | "int"
  | "objectType"
  | "string"
  | "objectId"
  | "object"
  | "date"
  | "list"
  | "uuid"
  | "bool"
  | "select"

// Mongodb has two types of schema(one embedded for sub data purly exists for main data, other one normal)
export type EmbeddedSchemaName = "Location" | "Qrcode"

export type NormalSchemaName =
  | "Enterprise"
  | "Order"
  | "Product"
  | "Checker"
  | "Regulatory"
  | "Category"
  | "CheckRecord"
  | "Stock"

export type SchemaName = EmbeddedSchemaName | NormalSchemaName

export interface SchemaObject {
  name: SchemaName
  primaryKey: string
  embedded: boolean
  properties: {
    _id: SchemaProperties
    [key: string]: SchemaProperties
  }
}

export type SchemaJson = {
  [key in NormalSchemaName]: SchemaObject
}

type ProductSchema = {
  _id: BSON.ObjectID
  assemblePlace?: string
  catgory: string
  description: string
  name: string
  ownerId: string
  produceDay: Date
  producer?: EnterpriseSchema
  shelfLife: number
  standard: string
  status: string
}

type CheckerSchema = {
  _id: BSON.ObjectID
  address?: string
  belong?: EnterpriseSchema
  email: string
  name?: string
  ownerId: string
}

type CheckRecordSchema = {
  _id: BSON.ObjectID
}

type EnterpriseSchema = {
  _id: BSON.ObjectID
  address?: string
  createdAt: Date
  creditCode: string
  description: string
  email?: string
  name?: string
  ownerId: string
  registerPlace: string
  tradeMark?: string
}
type OrderSchema = {
  _id: BSON.ObjectID
  customerId: string
  orderTime: Date
  transitionId: BSON.ObjectID
  paymentMethod: string
  products: Array<ProductSchema>
}

type StockSchema = {
  _id: BSON.ObjectID
}

type RegulatorySchema = {
  _id: BSON.ObjectID
  name?: string
}
type QrcodeSchemaEmbed = {
  value: string
}
type CategorySchema = {
  _id: BSON.ObjectID
  description: string
  name: string
  createdAt: Date
}

type ScanRecordSchema = {
  _id: BSON.ObjectID
  code?: QrcodeSchemaEmbed
  time: number
  createdAt: Date
  description: string
  isVerified: boolean
  location?: Location
  ownerId: string
  url: string
}

export interface SchemaResultMapper {
  Checker: CheckerSchema
  CheckRecord: CheckRecordSchema
  Enterprise: EnterpriseSchema
  Order: OrderSchema
  Stock: StockSchema
  Category: CategorySchema
  Regulatory: RegulatorySchema
  Product: ProductSchema

}

export type SearchResultMap = Map<
  string,
  SchemaName | SchemaResultMapper[NormalSchemaName]
>
