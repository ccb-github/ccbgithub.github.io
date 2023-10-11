"use client"
import clsx from "clsx"
import type CSS from "csstype"
import { MouseEventHandler, useState } from "react"
import { BSON } from "realm-web"
import { LoadingDots } from "../icons"

export default function Button({
  onClick: onClickMainAction = async () => {},
  id,
  text,
  dataId,
  type = "button",
  loadingIndication = false,
  children,
  disabled,
  value,
  className = "",
  backgroundColor = "blue",
  ...otherProps
}: {
  onClick?: MouseEventHandler
  text?: string
  dataId?: string | BSON.ObjectID
  type?: "button" | "submit" | "reset"
  children?: React.ReactNode
  loadingIndication?: boolean
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  value?: string
  backgroundColor?: CSS.Property.Color
}) {
  const [actionFinishing, setActionFinishing] = useState(true)
  return (
    <button
      type={type}
      id={id}
      value={value}
      onClick={(event) => {
        //If loading indiction is on, we need to enable loading state before the action
        loadingIndication ? setActionFinishing(false) : null;
        (async () => {
          await onClickMainAction(event)
          setActionFinishing(true)
        })()
      }}
      data-id={dataId}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "whitesmoke" : backgroundColor,
      }}
      className={clsx(
        `
        rounded-lg 
        px-3 py-1 text-sm font-medium text-black
        ${className}`,
        {
          "hover:bg-blue-500 hover:text-white": !disabled,
        },
      )}
      {...otherProps}
    >
      <span>
        {text}
        {children}
      </span>
      <span>{actionFinishing ? null : <LoadingDots color="black" />}</span>
    </button>
  )
}
