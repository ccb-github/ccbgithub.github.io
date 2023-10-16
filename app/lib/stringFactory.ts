import { NormalSchemaName } from "#/lib/schema/format";

export function toSchemaTypeString(str: string): NormalSchemaName {
  return `${str[0].toUpperCase()}${str.slice(1)}` as NormalSchemaName
}