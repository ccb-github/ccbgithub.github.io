import { BSON } from "realm-web"
import { EnterpriseSchema } from "./enterprise"
/**
 * @deprecated
 */
export type DeviceSchema = {
  _id: BSON.ObjectID
  model: string
  name: string
  manufacturer: EnterpriseSchema
}
