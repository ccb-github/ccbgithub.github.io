import { SchemaDataPropType } from "#/types/schema"
import { BSON } from "realm-web"

export default fieldConvert

type FieldInput = string

function fieldConvert(value: string, dataType: SchemaDataPropType) {
  if (value.length === 0) {
    return null
  }
  switch (dataType) {
    case "int":
      return intConvert(value)
    case "double":
      return floatConvert(value)
    case "date":
      return dateConvert(value)
    case "objectId":
      return objectIdConvert(value)
    case "bool":
      return booleanConvert(value)
    case "object":
      return JSON.parse(value)
    default:
      return otherConvert(value)
  }
}

function dateConvert(prop: string) {
  //TODO critical deal with invalid date
  return new Date(prop)
}
function intConvert(prop: string) {
  return Number.parseInt(prop)
}
function floatConvert(prop: FieldInput) {
  return Number.parseFloat(prop)
}
function booleanConvert(prop: FieldInput) {
  //TODO deal with invalid boolean
  return prop === "true"
}

function otherConvert(prop: FieldInput) {
  return prop
}
function objectIdConvert(prop: FieldInput) {
  return new BSON.ObjectId(prop)
}

export {
  booleanConvert,
  dateConvert,
  intConvert,
  objectIdConvert,
  otherConvert,
  floatConvert,
}
