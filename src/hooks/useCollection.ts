import { SchemaName } from "#/types/schema"
import { useState, useEffect } from "react"
import { useApp } from "./useApp"

export const useCollection = (collectionName: SchemaName) => {
  const realmApp = useApp()
  const [collection, setCollection] = useState<Realm.Services.MongoDB.MongoDBCollection<any>>()
  useEffect( () => {
    if(realmApp.currentUser === null) {
      throw new Error("You must login first to use useCollection hook")
    } else if(process.env.NEXT_PUBLIC_MONGODB_ALTA_DATABASE === undefined){
      throw new Error("Missing NEXT_PUBLIC_MONGODB_ALTA_DATABASE env varaiable")
    }
    console.log("Attention this is executed!")
    const targetCollection =
      realmApp.currentUser
        .mongoClient("mongodb-atlas")
        .db(process.env.NEXT_PUBLIC_MONGODB_ALTA_DATABASE)
        .collection(collectionName)
    setCollection(targetCollection)
    
  },[realmApp])
  return collection
}