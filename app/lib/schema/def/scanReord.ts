import { BSON } from "realm-web"
import { QrcodeSchemaEmbed } from "./embbed"

export type ScanRecordSchema = {
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