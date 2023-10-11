"use client"
import { useState } from "react"
import * as Realm from "realm-web"
import fetch, {
  Blob,
  blobFrom,
  blobFromSync,
  File,
  fileFrom,
  fileFromSync,
  FormData,
  Headers,
  Request,
  Response,
} from "node-fetch"
export function useApp() {
  console.log(fetch)
  const [app] = useState<Realm.App>(
    Realm.getApp(process.env.NEXT_PUBLIC_APP_ID!),
  )
  // Run in useEffect so that App is not created in server-side environment
  // useEffect(() => {
  //   setApp(Realm.getApp(process.env.NEXT_PUBLIC_APP_ID!))
  //   console.log("TheApp", Realm.getApp(process.env.NEXT_PUBLIC_APP_ID!))
  // }, [])
  return app
}
