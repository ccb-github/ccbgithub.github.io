"use client"
import { useTranslation } from "#/lib/i18n/client"
import { NavItem } from "#/types/webContent"
import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { useState } from "react"
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa"
//TODO type link, remove unnecessary props
export default function SideNavItem({
  text,
  link,
  items,
  lng,
  i18ns
}: {
  text: string
  link?: string
  description?: string
  items?: NavItem[]
  lng: string
  i18ns?: string
  close?: () => Promise<false | void>
}) {
  //TODO what does it mean to return false in link
  const segment = useSelectedLayoutSegment()
  const isActive = link === segment
  const { t } = useTranslation(lng, i18ns, { keyPrefix: "sidebar" })
  //{ keyPrefix: "sideBar"}
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="pl-4">
      {link ? (
        <Link
          href={`/${lng}${link}`}
          className={clsx(
            "nest-link flex justify-between rounded-md  px-3 py-2 text-sm font-medium hover:text-gray-300",
            {
              "text-blue-400 hover:bg-blue-800": !isActive,
              "text-white": isActive,
              opened: isOpen,
            }
          )}
        >
          {text}
        </Link>
      ) : (
        <a
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className={clsx(
            "flex rounded-md cursor-pointer px-3 py-2 text-sm font-medium hover:text-gray-300",
            {
              "text-blue-400 hover:bg-blue-800": !isActive,
              "text-white": isActive,
              opened: isOpen,
            }
          )}
        >
          {" "}
          {isOpen ? (
            <FaChevronCircleUp className="self-center mr-2" />
          ) : (
            <FaChevronCircleDown className="self-center mr-2" />
          )}
          {text}
          <svg
            className="with-icon_icon__MHUeb"
            data-testid="geist-icon"
            fill="none"
            height="24"
            shape-rendering="geometricPrecision"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            width="24"
            style={{
              color:"whitesmoke",
              width:16,height:16,
              transform : `rotate(${isOpen? 0.25: 0}turn)`
            }}
          >
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </a>
      )}
      {/* If the item contain subitems and the tree menu node is open, render the child menu */}
      {items && isOpen
        ? items.map((item, index) => (
            <SideNavItem
              lng={lng}
              key={index}
              text={t(item.name)}
              i18ns={i18ns}
              link={item.link}
              description={item.description}
              items={item.items}
            />
          ))
        : null}
    </div>
  )
}
