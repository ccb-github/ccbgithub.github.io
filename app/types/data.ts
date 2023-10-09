import { ObjectID } from "bson"

export type UserProfile = {
  _id: ObjectID
  _userId: string
  email: string
  name?: string
  isAdmin: boolean
  subrole?: "seller" | "producer"
  role: "globalAdmin" | "customer" | "enterprise" | "regulatory"
  emailVerified: boolean
}
