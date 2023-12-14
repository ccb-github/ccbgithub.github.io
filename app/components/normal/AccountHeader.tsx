"use client"
import { useApp } from "#/hooks/useApp"
import { UserProfile } from "#/types/data"
import { useEffect, useState } from "react"
import Button from "#/components/common/Button"
import { useRouter } from "next/navigation"
import { FaUser } from "react-icons/fa"
import { useTranslation } from "#/lib/i18n/client"
import { clearTimeout, setTimeout } from "timers"

export default function AccountHeader({ lng }: { lng: string }) {
  const USER_LOADING_TIMEOUT = 5000 //ms
  const realmApp = useApp()
  const [userData, setUserData] = useState<UserProfile | undefined>()
  const { t } = useTranslation(lng)
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const clearUserLoadingTimeout = setTimeout(() => {
      if (realmApp.currentUser === null)
        alert(
          t(["User load timeout"], {
            time: USER_LOADING_TIMEOUT,
            ns: "dialog",
          }),
        )
    }, USER_LOADING_TIMEOUT)
    return () => {
      clearTimeout(clearUserLoadingTimeout)
    }
  }, [realmApp.currentUser, t])
  useEffect(() => {
    if (realmApp?.currentUser === null || realmApp?.currentUser === undefined) {
      return
      //throw new Error("You should login to use this AccountFooter")
    }
    setUserData(() => {
      setIsLoading(false)
      return realmApp?.currentUser!.customData as UserProfile
    })
  }, [realmApp, realmApp.currentUser])

  return (
    <div className="flex items-center space-x-4 p-3.5 lg:px-5 lg:py-3">
      <Button
        className="w-auto right-2 bottom-8"
        onClick={async () => {
          realmApp?.currentUser
            ?.logOut()
            .then(() => router.push(`/${lng}`))
            .catch((error) => {
              throw error
            })
        }}
      >
        <FaUser className="h-8 inline" />
        {t("Log out")}
      </Button>
      {/* <div className="text-sm text-gray-400"> */}
      {isLoading ? (
        <p className="font-extrabold">Loading...</p>
      ) : (
        <>
          <span className="">
            <span className="mr-2 font-extrabold">{t("Email")}</span>
            <a
              className="underline decoration-dotted underline-offset-4 hover:text-gray-400"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              {userData!.email}
            </a>
          </span>
          <span>
            <span className="mr-2 font-extrabold">{t("Role")}</span>
            <a
              className="underline decoration-dotted underline-offset-4 hover:text-gray-400"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              {userData!.role}
            </a>
          </span>
        </>
      )}
    </div>
  )
}
