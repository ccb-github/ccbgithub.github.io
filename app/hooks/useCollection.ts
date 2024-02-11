import { useState, useEffect } from "react"
import { useApp } from "./useApp"
import { NormalSchemaName } from "#/lib/schema/format"
import { SchemaTypeMapper } from "#/lib/schema"

export const useCollection = (collectionName: NormalSchemaName) => {
  const realmApp = useApp()
  const [collection, setCollection] =
    useState<
      Realm.Services.MongoDB.MongoDBCollection<
        SchemaTypeMapper[NormalSchemaName]
      >
    >()
  useEffect(() => {
    if (realmApp?.currentUser === null) {
      throw new Error("You must login first to use useCollection hook")
    } else if (process.env.NEXT_PUBLIC_MONGODB_ATLAS_DATABASE === undefined) {
      throw new Error(
        "Missing NEXT_PUBLIC_MONGODB_ATLAS_DATABASE env varaiable",
      )
    }
    console.log("Attention this is executed!")
    const targetCollection = realmApp!.currentUser
      .mongoClient("mongodb-atlas")
      .db(process.env.NEXT_PUBLIC_MONGODB_ATLAS_DATABASE!)
      .collection(collectionName)
    setCollection(targetCollection)
  }, [realmApp, collectionName])
  return collection
}
