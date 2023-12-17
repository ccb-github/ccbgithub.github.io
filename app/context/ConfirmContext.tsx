"use client"
import { Dialog } from "@headlessui/react"
import React, { createContext } from "react"

export const ConfirmContext = createContext<{
  confirmed: boolean
  opened: boolean
  message: string
}>({
  confirmed: false,
  opened: false,
  message: "Default message",
})

export default function ConfirmContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConfirmContext.Provider
      value={{
        confirmed: false,
        opened: false,
        message: "Default message",
      }}
    >
      <Dialog
        open
        onClose={() => {
          alert("Dialog closed")
        }}
      >
        {" "}
        <Dialog.Panel>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Panel>
      </Dialog>
      {children}
    </ConfirmContext.Provider>
  )
}
