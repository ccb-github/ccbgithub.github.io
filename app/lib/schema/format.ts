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
// Mongodb has two types of schema(one embedded for sub data purely exists for main data, other one normal)
export type EmbeddedSchemaName = "Location" | "Qrcode"

export enum URL_TO_SCHEMANAME{
  "product" = "Product",
  "enterprise" = "Enterprise",
  "order" = "Order",
  "checker"  = "Checker",
  "regulatory" = "Regulatory",
  "category" = "Category",
  "checkRecord" = "CheckRecord",
  "stock" = "Stock",
  "logistic" = "Logistic"
}
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

// TODO with different shape
export interface SchemaProperty<DefaultValue = string, PropKey = string> {
  defaultValue?: DefaultValue
  min?: number
  name: string
  optional: boolean
  dataType: SchemaDataPropType
  roleType?: RoleType
  /**
   * This field will present when this is an foreign key field
   */
  relationSchemaName?: NormalSchemaName
  indexed: boolean
  mapTo: string
  objectType?: SchemaName
}
export interface EmbedSchemaObject<SchemaPropKey extends string> {
  name: EmbeddedSchemaName
  embedded: true
  properties: {
    [PropKey in SchemaPropKey]: SchemaProperty
  } 
}
export interface NormalSchemaObject<SchemaPropKey extends string = "_id"> {
  name: SchemaName
  primaryKey: string
  embedded: false
  properties: {
    [PropKey in SchemaPropKey]: SchemaProperty
  } & {
    //_id is ma for a schema
    _id: SchemaProperty
  }
}
