import { BSON } from "realm-web"
import { QrcodeSchemaEmbbed } from "./embbed"

export type ScanRecordSchema = {
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