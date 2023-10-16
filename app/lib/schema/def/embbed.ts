import { EmbeddedSchemaJson, NormalSchemaJson } from "#/lib/schema"
import { EmbedSchemaObject, NormalSchemaObject } from "../format"

export type QrcodeSchemaEmbed = {
  value: string
}
export type LocationSchemaEmbed = {
  latitude: number
  longitude: number
}
const qrcodeSchemaEmbed: EmbedSchemaObject<keyof QrcodeSchemaEmbed> = {
  
  name: "Qrcode",
  embedded: true,
  properties: {
    value: {
      name: "value",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "value",
    },
  }
}
const locationSchemaEmbed: EmbedSchemaObject<keyof LocationSchemaEmbed> = {
  
  name: "Location",
  properties: {
    latitude: {
      name: "latitude",
      dataType: "double",
      indexed: false,
      optional: false,
      mapTo: "latitude",
    },
    longitude: {
      name: "longitude",
      dataType: "double",
      indexed: false,
      optional: false,
      mapTo: "longitude",
    },
  },
  embedded: true,
  
}
const embedSchema: EmbeddedSchemaJson = {
  Location: locationSchemaEmbed,
  Qrcode: qrcodeSchemaEmbed
}

export default embedSchema
