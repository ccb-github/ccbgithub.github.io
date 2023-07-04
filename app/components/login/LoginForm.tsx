'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import * as Realm from 'realm-web'
import { useApp } from '#/hooks/useApp';
import Link from 'next/link';
import { useTranslation } from '#/lib/i18n/client';
import { roleUrlMap } from '#/lib/webcontents/user';
import { UserProfile } from '#/types/data';

export default function LoginForm({lng, className}: {lng: string, className?: string}) {
  const email = useRef('')
  const password = useRef('')
  const realmApp = useApp()
  const router = useRouter()
  
  const {t} = useTranslation(lng)
  const viewRef = useRef(null) 
  const [name, setName] = useState("")
  const currentPath = usePathname()
  useEffect(() => {
    //const checkerWIndowInterval = setInterval( () => {
      // if(typeof window !== undefined) 
      //   alert(" windowObject detected")     
    //},2000)
    console.log(`View ref ${viewRef}`)
  },[viewRef])
  const loginRealmAppAsync = async (event: FormEvent) => {
    event.preventDefault()
    console.log({ email: email.current, password: password.current })
    //Create an email credential
    const credentials = Realm.Credentials.emailPassword(
      email.current,
      password.current
    )
    // Authenticate the user
    try {
      const loginUser = await realmApp.logIn(credentials) 
      console.log('User id', loginUser.id)
      const userCustomData = loginUser.customData as UserProfile
      if(!userCustomData.emailVerified) {
        alert(t("Your account is unverified, contact the admin", "message"))
      }
      router.push(`./${lng}/${roleUrlMap[userCustomData.role]}?id=${loginUser.id}`)
     
    } catch (error) {
      //@ts-ignore
      switch(error.errorCode){
        case 'AuthError':
          //@ts-ignore
          alert(error.message)  
          break
        case 'InvalidPassword':
          alert(`Invalid password, message:${error}`)
          break
        default:
          break
      }    
      console.error(error)
      throw error;
      
    }
  }
  // <CheckInCircleIcon/>
  return (
    <div id="login-form-container" className={`pt-4 ${className || ""}`} ref={viewRef}>
      {/* <progress value={0.5}/>
    
      <ThumbnailImage/> */}
     
      <form
        id="login-form"
        className="form p-4 border border-solid"
        // action={`${lng}/admin`}
        onSubmit={() => false}
      > 
        <h2 className="text-info text-center text-xl">{
           /*@ts-ignore*/
           t("Login")
        }</h2>
        <div className="form-group">
          <label htmlFor="username" className="text-info p">
            {t("Email")}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              email.current = event.target.value
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-info p-3">
            {t("Password")}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            minLength={6}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              (password.current = event.target.value)
            }
          />
        </div>
        <div className="form-group p-2">
          <span className='space-x-2'>
            <Link href={`./${lng}/register`}><span className='underline text-blue-400'>{t("Register first")}</span></Link>
            <label htmlFor="remember-me" className="text-info">
              <span>{t("Remember me")}</span> 
              <span>
                <input id="remember-me" name="remember-me" type="checkbox" />
              </span>
            </label>
           
          </span>
          
          <button
            type="submit"
            name={"submit"}
            className="btn btn-info btn-md bg-blue-500 
              rounded hover:text-black-200 hover:bg-blue-300"
            onClick={loginRealmAppAsync}
          >
            {t("Login")}
          </button>
        </div>
      </form>
    </div>
  )
}
