"use client"
import { useApp } from "#/hooks/useApp"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import * as Realm from "realm-web"

import { t } from "i18next"
import Link from "next/link"
import { roleUrlMap } from "#/lib/webContents/user"
import { type UserProfile } from "#/types/data"

export default function RegisterForm({ lng }: { lng: string }) {
  const email = useRef("")
  const password = useRef("")
  const repeatPassword = useRef("")
  const app = useApp()
  const clientRouter = useRouter()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const registerWithEmailAndPassword = async (event: FormEvent) => {
    event.preventDefault()
    if (
      email.current === "" ||
      password.current === "" ||
      repeatPassword.current === ""
    ) {
      alert("Please fill all the field")
      return
    }

    if (password.current != repeatPassword.current) {
      console.log(password.current, repeatPassword)
      alert("Two password.current mismatch")
      return
    }
    console.log("Register begin")
    app.emailPasswordAuth
      .registerUser({ email: email.current, password: password.current })
      .then(async () => {
        const emailPasswordCred = Realm.Credentials.emailPassword(
          email.current,
          password.current,
        )

        const loginUser = await app.logIn(emailPasswordCred)
        const userCustomData = loginUser.customData as UserProfile
        console.log(`Login with user ${loginUser.id}`)

        clientRouter.push(`./${lng}/${roleUrlMap[userCustomData.role]}`)
      })
      .catch((error) => {
        event.preventDefault()
        alert(error?.message)
        console.error(error)
      })
  }

  return (
    <div id="register-form-container" className="pt-4">
      <form
        id="register-form"
        className="form p-4 border border-solid"
        onSubmit={registerWithEmailAndPassword}
      >
        <h2 className="text-info text-center text-xl">{t("Register")}</h2>
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
              (email.current = event.target.value)
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
        <div className="form-group">
          <label htmlFor="repeat-password" className="text-info p-3">
            {t("Repeat Password")}
          </label>
          <input
            type="password"
            name="repeat-password"
            id="repeat-password"
            className="form-control"
            minLength={8}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              (repeatPassword.current = event.target.value)
            }
          />
        </div>
        <div className="form-group">
          <span className="space-x-1">
            <Link href={`${lng}`} className="underline">
              {t("Back to login")}
            </Link>
            <label htmlFor="remember-me" className="text-info">
              <span>{t("Remember me")}</span>
              <span>
                <input id="remember-me" name="remember-me" type="checkbox" />
              </span>
            </label>
          </span>
          <button
            name={"submit"}
            type={"submit"}
            className="btn btn-info btn-md bg-blue-300 rounded"
          >
            {t("Register")}
          </button>
        </div>
      </form>
    </div>
  )
}
