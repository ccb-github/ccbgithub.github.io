"use client"
import { SearchIcon } from "../icons"
import { NormalSchemaName } from "#/types/schema"

export default function SearchBar({
  className,
  placeHolder,
  onSearchSubmit,
  children,
}: {
  className?: string
  searchSchemaName: NormalSchemaName
  placeHolder?: string
  onSearchSubmit: (searchResult: string) => any
  children: React.ReactNode
}) {
  const submitValue = "submit data"
  /**h-auto is not confirmed nor test*/

  return (
    <div
      className={`flex flex-row items-center justify-center h-auto ${
        className || ""
      }`}
    >
      <span className="self-center content-center flex flex-row items-center">
        <input
          type="text"
          className="rounded-md h-8 p-2"
          placeholder={placeHolder || "Searchbar placeholder not set"}
        />
        <button
          type="button"
          className=""
          onClick={() => {
            onSearchSubmit(submitValue)
          }}
        >
          <SearchIcon />
        </button>
      </span>
      {children}
    </div>
  )
}
