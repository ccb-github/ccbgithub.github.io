"use client"
import Button from "#/components/common/Button"
import { ConfirmContext } from "#/context/ConfirmContext"
import { useContext } from "react"
export default function Expo() {
  let confirmContext = useContext(ConfirmContext)
  const action = async () => {
    const {setOpened} = confirmContext
    setOpened(true)
  }
  return (
    <Button onClick={action}>Click</Button>
  )
}