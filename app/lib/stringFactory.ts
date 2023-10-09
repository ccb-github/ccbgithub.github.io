import { NormalSchemaName } from "#/types/schema"

export function toSchemaTypestring(str: string): NormalSchemaName {
  return `${str[0].toUpperCase()}${str.slice(1)}` as NormalSchemaName
}