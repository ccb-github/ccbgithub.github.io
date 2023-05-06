'use client'
import { useApp } from "#/hooks/useApp"
import { SchemaName } from "#/types/schema"
import React, { useEffect, useState } from "react"
const useCollection = (collectionName: SchemaName) => {
  const realmApp = useApp()
  const [collection, setCollection] = useState<Realm.Services.MongoDB.MongoDBCollection<any>>()
  useEffect( () => {
    if(realmApp.currentUser === null) {
      throw new Error("You must login first to use useCollection hook")
    } else if(process.env.NEXT_PUBLIC_MONGODB_ALTA_DATABASE === undefined){
      throw new Error("Missing NEXT_PUBLIC_MONGODB_ALTA_DATABASE env varaiable")
    }
    console.log("Attention this is executed!!!!!!!!!!!!!!!!!!\!!!!!!!!!!!!!!!!!!!!!!!!1")
    const targetCollection =
      realmApp.currentUser
        .mongoClient("mongodb-atlas")
        .db(process.env.NEXT_PUBLIC_MONGODB_ALTA_DATABASE)
        .collection(collectionName)
    setCollection(targetCollection)
    
  },[realmApp])
  return collection
}
export const AppContext = React.createContext({
  useApp, 
  useCollection
})
export default function AppProvider({children}: {children: React.ReactNode}){
 
 
  return(
    <AppContext.Provider value={{
      useApp,
      useCollection
      
    }}>
      {children}
    </AppContext.Provider>
  )  
} 
