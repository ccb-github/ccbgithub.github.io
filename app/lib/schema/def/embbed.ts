import { SchemaObject } from "../format"

export type QrcodeSchemaEmbed = {
  value: string
}
export type LocationSchemaEmbed = {
  latitude: number
  longitude: number
}

const qrcodeSchemaEmbed: SchemaObject<"Qrcode", keyof QrcodeSchemaEmbed> = {
  name: "Qrcode",
  embedded: true,
  properties: {
    value: {
      name: "value",
      dataType: "string",
      indexed: false,
      optional: false,
      mapTo: "value",
      roleType: "select",
    },
  },
}
const locationSchemaEmbed: SchemaObject<"Location", keyof LocationSchemaEmbed> =
  {
    name: "Location",
    properties: {
      latitude: {
        name: "latitude",
        dataType: "double",
        indexed: false,
        optional: false,
        mapTo: "latitude",
        roleType: "select",
      },
      longitude: {
        name: "longitude",
        dataType: "double",
        indexed: false,
        optional: false,
        mapTo: "longitude",
        roleType: "select",
      },
    },
    embedded: true,
  }
const embedSchema = {
  Location: locationSchemaEmbed,
  Qrcode: qrcodeSchemaEmbed,
}

export default embedSchema
