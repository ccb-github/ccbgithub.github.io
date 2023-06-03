import { SchemaName } from "#/types/schema"

export function toSchemaTypestring( str: string ): SchemaName {
  //@ts-ignore
  return `${str[0].toUpperCase()}${str.slice(1)}`
}