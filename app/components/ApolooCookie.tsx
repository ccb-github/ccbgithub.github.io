//@ts-nocheck

'use client'
import { setCookie } from "nookies";

import { useEffect } from "react";
import { useApp } from "#/hooks/useApp";
export default function ApolloCookie({children}) {
  const app = useApp();
  // Reset the user access token in cookies on a regular interval
  useEffect(() => {
    const user = app?.currentUser;
   
    console.log(`App wrapper useEffect`)
    if (user) {
     
      setCookie(null, "accessToken", user.accessToken);
      // Refresh token before session expires
      const TWENTY_MIN_MS = 1200000;
      const resetAccessToken = setInterval(async () => {
        
        await app?.currentUser?.refreshCustomData();
        console.log(`The token at ${new Date().toLocaleDateString()}`)
        setCookie(null, "accessToken", user.accessToken);
      }, TWENTY_MIN_MS);
      // Clear interval setting access token whenever component unmounts or
      // there's a change in user.
      return () => clearInterval(resetAccessToken);
    }
  }, [app, app?.currentUser]);
  return (
    <>
     {children}
    </>
  );
}
