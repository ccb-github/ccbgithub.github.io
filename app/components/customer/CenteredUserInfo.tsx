"use client"

import { useMemo, useState } from "react"

import { useApp } from "#/hooks/useApp"
import { useTranslation } from "#/lib/i18n/client"
import { FaUser } from "react-icons/fa"
import { UserProfile } from "#/types/data"

export default function CenterUserInfo({ lng }: { lng: string }) {
  // const currentUser = useRef(useApp().currentUser)
  const realmApp = useApp()
  //const { email } = realmApp.currentUser?.profile
  // const { role, isAdmin, name } = currentUser.current!.customData as UserProfile
  const [authCategories] = useState<string[]>(
    (realmApp.currentUser?.customData.authCatgories as string[]) || [],
  )
  const userProfile = useMemo(() => {
    if (realmApp.currentUser !== null)
      return {
        ...realmApp.currentUser.customData,
        email: realmApp.currentUser.profile.email,
      }
    else return null
  }, [realmApp.currentUser])
  const { email, role, name, belong } = userProfile as UserProfile
  const { t } = useTranslation(lng)

  //A grid box with 3column if device is above middle size
  return (
    <div
      id="centered-user-info"
      className="border-b border-gray-800 
           grid grid-cols-1 md:grid-cols-3  
         "
    >
      {" "}
      <div>
        {/* <BlurImage 
        alt={`User avatar of ${currentUser.current?.id}`}
        width={64}
        height={64}
        src={currentUser.current?.profile.pictureUrl || 
            "https://i.ibb.co/7xmcfgQ/Screenshot-from-2023-05-02-18-06-17.png"}/> */}
        <FaUser className="w-32 h-32 float-right" />
      </div>
      <div>
        <div id="user-info-column" className="md:col-span-2">
          <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
            {/* Why this return null */}
            <span className="font-bold mr-2">{t("Email") + ":"}</span>
            {email}
          </div>
          <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
            <span className="font-bold mr-2">{t("Name") + ":"}</span>
            {name}
          </div>
          <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
            <span className="font-bold mr-2">{t("Role") + ":"}</span>
            {role}
          </div>
          {belong && (
            <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
              <span className="font-bold mr-2">{t("Belong") + ":"}</span>
              {belong}
            </div>
          )}
          <hr />
          {/* <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
            <label>Allowed catgory</label>
            <ReactSelect className='w-full' options={productCatgoryRoleList}/>
          </div> */}
        </div>
      </div>
      {["globalAdmin, enterprise"].includes(role) ? (
        <section>
          {t("Authorized categories")}{" "}
          {["A", "B", "C"].map((category) => (
            <>
              <label className="mr-4">
                A
                <input
                  type="checkbox"
                  value={authCategories.includes(category) ? "true" : "false"}
                />
              </label>
            </>
          ))}
        </section>
      ) : null}
    </div>
  )
}
