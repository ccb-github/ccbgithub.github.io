import { type BSON } from "realm-web"
// TODO with different shape
export interface SchemaProperty<DefaultValue = string> {
  defaultValue?: DefaultValue
  min?: number
  name: string
  optional: boolean
  dataType: SchemaDataPropType
  roleType?: RoleType
  relationSchemaName?: NormalSchemaName
  indexed: boolean
  mapTo: string
  objectType?: SchemaName
}

export type RoleType = "select" | "normal"
// TODO keep two field exclusive
export type SchemaDataPropType =
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
  | "Logistic"

export type SchemaName = EmbeddedSchemaName | NormalSchemaName

export interface SchemaObject<SchemaPropKey extends string = "_id"> {
  name: SchemaName
  primaryKey: string
  embedded: boolean
  properties: {
    [PropKey in SchemaPropKey]: SchemaProperty
  } & {
    //_id is mantory for a schema
    _id: SchemaProperty
  }
}

export type SchemaJson = {
  [key in NormalSchemaName]: SchemaObject
}

export type ProductSchema = {
  _id: BSON.ObjectID
  assemblePlace?: string
  category: string
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
  method: string
  name: string
  result: string
  device?: BSON.ObjectID
}

type LogisticSchema = {
  _id: BSON.ObjectID
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DeviceSchema = {
  _id: BSON.ObjectID
  model: string
  name: string
  manufacturer: EnterpriseSchema
}

export type EnterpriseSchema = {
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

export type OrderSchema = {
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

type CategorySchema = {
  _id: BSON.ObjectID
}

export type RegulatorySchema = {
  _id: BSON.ObjectID
  name: string
  address: string
  description: string
}
type QrcodeSchemaEmbbed = {
  value: string
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ScanRecordSchema = {
  _id: BSON.ObjectID
  code?: QrcodeSchemaEmbbed
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
  Logistic: LogisticSchema
}

export type SearchResultMap = Map<
  string,
  SchemaName | SchemaResultMapper[NormalSchemaName]
>
