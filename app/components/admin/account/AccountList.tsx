/* eslint-disable react/react-in-jsx-scope */
"use client"

import { useTranslation } from "#/lib/i18n/client"
import { useApp } from "#/hooks/useApp"
import { getUsers } from "#/lib/api/mongoService"
import type { ObjectID } from "bson"
import { useEffect, useMemo, useState } from "react"
import Button from "#/components/common/Button"
import { useRouter } from "next/navigation"

type AccountProfile = {
  _id: ObjectID
  _userId: string
  role: "globalAdmin" | "customer" | "enterprise" | "regulatory" | "checker"
  subrole?: string
  email: string
  emailVerified: boolean
}
type RoleNameLabel = {
  [key in AccountProfile["role"]]: string
}
// Map the role value in database to the value on the web page
const roleNameLabelMap: RoleNameLabel = {
  globalAdmin: "Admin(global)",
  enterprise: "Enterprise",
  customer: "Customer",
  regulatory: "Regulatory",
  checker: "Checker",
}

console.log(roleNameLabelMap)

export function AccountList({ lng }: { lng: string }) {
  const mongoApp = useApp()
  const { t } = useTranslation(lng, "account-list")
  const [accounts, setAccounts] = useState<AccountProfile[]>()
  // The collection name of user profile(store as custom data)

  const router = useRouter()
  // TODO env vara
  const accountsCollection = useMemo(
    () =>
      mongoApp?.currentUser
        ?.mongoClient("mongodb-atlas")
        .db("qrcodeTraceability")
        .collection("User"),
    [mongoApp?.currentUser],
  )

  useEffect(() => {
    if (mongoApp?.currentUser !== null && mongoApp?.currentUser !== undefined) {
      getUsers(mongoApp.currentUser!, { email: { $exists: true } })
        .then((accounts) => {
          setAccounts(accounts)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [mongoApp, mongoApp?.currentUser])

  // TODO consider the type of user collection
  const deleteAccount = async (userId: string) => {
    if (confirm("Are you sure you want to delete it")) {
      if (mongoApp.currentUser?.id === userId) {
        alert("You can not delete the account of yourself")
      }

      // Delete the profile
      accountsCollection
        ?.deleteOne({ _userId: userId })
        .then((result) => {
          mongoApp.deleteUser(mongoApp.allUsers[userId])
          alert(`Delete ${result.deletedCount} account with profile${userId}`)
          router.refresh()
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const accountActivate = async (itemId: ObjectID) => {
    const result = await accountsCollection?.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          emailVerified: true,
        },
      },
    )
    console.log({ updateResult: result })
    alert(result)
  }

  return (
    <table className="border-none">
      <thead>
        <tr>
          <th
            className="max-w-32 overflow-x-hidden"
            style={{ maxWidth: "8rem", overflowX: "hidden" }}
          >
            {t("User ID")}
          </th>
          <th style={{ maxWidth: "8rem", overflowX: "hidden" }}>
            {t("Email")}
          </th>
          <th style={{ maxWidth: "8rem", overflowX: "hidden" }}>{t("role")}</th>
          <th style={{ maxWidth: "8rem", overflowX: "hidden" }}>
            {t("Sub role")}
          </th>
          <th style={{ maxWidth: "8rem", overflowX: "hidden" }}>
            {t("Verified")}
          </th>
          <th colSpan={3}>{t("Action")}</th>
        </tr>
      </thead>
      <tbody>
        {accounts?.map((account, index) => (
          <tr key={index}>
            <td>{account._userId}</td>
            <td>{account?.email}</td>
            <td>
              {account.role}
              {/* <label htmlFor="role-select">{t('Choose')}</label>
            <select
              id="role-select"
              
              defaultValue={account.role || 'Set the role'}
            >
              {Object.keys(roleNameLabelMap).map((role) => (
                <option key={role} value={role}>
                  @ts-ignore
              {roleNameLabelMap[role]}
            </option>
              ))}
          </select> */}
            </td>
            <td>{account.subrole}</td>
            <td>
              <Button
                className={account.emailVerified ? "" : "bg-gray-100"}
                disabled={account.emailVerified}
                onClick={() => {
                  accountActivate(account._id)
                }}
              >
                {account.emailVerified
                  ? t("passed", "common")
                  : t("pass", "common")}
              </Button>
            </td>
            <td>
              <a href={`./account?id=${account._id.toHexString()}`}>
                {t("Edit", "common")}
              </a>
            </td>
            <td>
              <Button
                onClick={async () => {
                  deleteAccount(account._userId)
                }}
              >
                {t("Delete", "common")}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
