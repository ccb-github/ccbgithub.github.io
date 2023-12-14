declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MONGODB_ATLAS_DATABASE: string
      NEXT_PUBLIC_APP_ID: string
      NEXT_PUBLIC_SEARCH_ENDPOINT: string
    }
  }
}

export {}
