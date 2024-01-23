"use client"
import ConfirmDialog from "#/components/common/dialog/ConfirmDialog"
import { Dialog } from "@headlessui/react"
import React, { createContext, useState } from "react"

export const ConfirmContext = createContext<{
  confirmed: boolean
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  message: string
}>({
  confirmed: false,
  setOpened: () => false,
  opened: false,
  message: "Default message",
})

export default function ConfirmContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [opened, setOpened] = useState(false)
  return (
    <ConfirmContext.Provider
      value={{
        confirmed: false,
        setOpened,
        opened,
        message: "Default message",
      }}
    >
      {/* <Dialog
        open={}
        onClose={() => {
          alert("Dialog closed")
        }}
      >
        {" "}
        <Dialog.Panel>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Panel>
      </Dialog> */}
      {children}
    </ConfirmContext.Provider>
  )
}
