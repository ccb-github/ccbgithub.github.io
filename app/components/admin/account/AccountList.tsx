'use client'

import { useTranslation } from "#/lib/i18n/client";
import { useApp } from "#/hooks/useApp";
import { getUsers } from "#/lib/api";

import { ObjectID } from "bson";
import { MouseEvent, useEffect, useRef, useState } from "react";
import NormalButton from "#/components/common/NormalButton";
//Skeleton css file

import { useRouter } from 'next/navigation';
import PermissionDialog from "#/components/common/PermissionDialog";
import Link from "next/link";

type Account = {
  _id: ObjectID
  _userId: string
  role: 'globalAdmin' | 'customer' | 'enterprise' | 'regulatory' | "checker"
  email: string,
  emailVerified: boolean
}
type RoleNameLabel = {
  [key in (Account["role"])]: string;
};
//map the role value in database to the value on the web page
const roleNameLabelMap: RoleNameLabel = {
  "globalAdmin": "Admin(global)",
  "enterprise": "Enterprise",
  "customer": "Customer",
  "regulatory": "Regulatory",
  "checker": "Checker"
}
type RoleList = keyof RoleNameLabel


const roleList = ["globalAdmin", "enterprise", "customer", "checker"]

console.log(roleNameLabelMap)
const collectionName = "User"
export function AccountList({ lng }: { lng: string }) {
  const mongoApp = useApp()
  const { t } = useTranslation(lng, "account-list")
  const [accounts, setAccounts] = useState<Account[]>()
  const router = useRouter()
  //TODO env vara
  const accountsCollection = useRef( 
    mongoApp.currentUser?.mongoClient('mongodb-atlas').db('qrcodeTraceability').collection("User")
  )
  useEffect(() => {
    if (mongoApp?.currentUser) {
      getUsers(mongoApp.currentUser)
        .then(accounts => {
          setAccounts(accounts)
        })
        .catch((error) => console.error(error))
      /* 	
      const mongo = mongoApp?.currentUser?.mongoClient('mongodb-atlas');
      const searchCollection = 'User'
      const accountsCollection = mongo.db('qrcodeTraceability').collection(searchCollection);
      const customUserData = mongoApp.currentUser.customData;
      const {profile, providerType, deviceId} = mongoApp.currentUser
      console.log(`${JSON.stringify(profile) + deviceId}`)
      accountsCollection
        .find({},{projection: {name: 1, role: 1, email: 1, emailVerified: 1}})
        .then((foundAccounts) => {
          console.log(foundAccounts.length)
          setAccounts((_currentDatas) => {
            return [...foundAccounts]
          })
        })
        .catch((error) => console.error(error)) */
    }
  }, [mongoApp, mongoApp?.currentUser])

  //TODO consider the type of user collection
  const deleteItem = async (id: ObjectID) => {

    if (confirm("Are you sure you want to delete it")) {
      const mongoCollection = mongoApp
        ?.currentUser
        ?.mongoClient('mongodb-atlas')
        .db('qrcodeTraceability')
        .collection(collectionName);
      //@ts-ignore
      mongoCollection?.deleteOne({ _id: id })
        .then(result => {
          if (confirm(`Delete ${result.deletedCount} account with ${id}`)) {
            router.refresh()
          }
        })
        .catch(
          error => console.error(error)
        )
    }
  }
  const accountActivate = async ( itemId: ObjectID) => {
    try {
      const result = await accountsCollection.current?.findOneAndUpdate(
        { _id: itemId },
        {
          $set: {
            emailVerified: true
          }
        }
      )
      console.log({ updateResult: result })
      alert(result)
    } catch (error) {
      throw error
    }
  }
  const profileSubmit = async (profileData: any) => {

    
      try {
        const result = await accountsCollection.current?.findOneAndUpdate(
          { _id: profileData["_id"] },
          {
            $set: {
              role: profileData.role
            }
          }
        )
        console.log({ updateResult: result })
      } catch (error) {
        throw error
      }
  }

  return (
    <table>
      <thead>
        <tr>
          <th style={{ maxWidth: '8rem', overflowX: 'hidden' }}>{t("User ID")}</th>
          <th style={{ maxWidth: '8rem', overflowX: 'hidden' }}>{t("Email")}</th>
          <th style={{ maxWidth: '8rem', overflowX: 'hidden' }}>{t("role")}</th>
          <th style={{ maxWidth: '8rem', overflowX: 'hidden' }}>{t("Permission")}</th>
          <th colSpan={3}>{t("Action")}</th>
        </tr>
      </thead>
      <tbody>
        {accounts?.map((account, index) => (
          <tr key={index}>
            <td>{account._userId}</td>
            <td>{account?.email || 'null'}</td>
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
        <td>
          <NormalButton
            className={account.emailVerified ? "" : "bg-gray-100"}
            disabled={account.emailVerified}
            onClick={() => {  
              accountActivate(account._id)
            }}>Pass</NormalButton>
        </td>
      <td>
        {/* <a
              href="#"
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                const roleSelect =
                  e.currentTarget.parentElement?.parentElement?.querySelector(
                    '#roleSelect',
                  ) as HTMLSelectElement

                profileSubmit({ role: roleSelect.value, _id: account._id })
              }}
            >
              {t('Submit')}
            </a> */}
        <a
          href={`./account/${account._id.toHexString()}`}>
          Edit
        </a>

      </td>
      <td>
        <NormalButton onClick={() => { deleteItem(account._id) }}>Delete</NormalButton>
       
        
      </td>
    </tr>
  ))
}
    <PermissionDialog/>
      </tbody >
    </table >
  )
}

