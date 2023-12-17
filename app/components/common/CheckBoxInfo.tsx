"use client"
import { Switch } from "@headlessui/react"
import { FaCheck } from "react-icons/fa"

type CheckBoxInfoProps = {
  status: boolean
  name: string
  description?: string
  iconClassName?: string
}
export default function CheckBoxInfo({ name }: CheckBoxInfoProps) {
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <FaCheck className="w-8 inline-block" />
        {name}
        <Switch />
      </div>
      <div className="w-full">Text reasonable</div>
    </div>
  )
}
