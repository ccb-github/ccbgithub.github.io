import { NornmalSchemaJson } from ".."

export type QrcodeSchemaEmbbed = {
  value: string
}
const locationSchemaJson: NornmalSchemaJson = {
  Location: {
    name: "Location",
    properties: {
      latitude: {
        name: "latitude",
        dataType: "float",
        indexed: false,
        optional: false,
        mapTo: "latitude",
      },
      longitude: {
        name: "longitude",
        dataType: "float",
        indexed: false,
        optional: false,
        mapTo: "longitude",
      },
    },
    embedded: true,
  },
}

export default EmbeddedSchema
