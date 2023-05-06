'use client'
import { SearchCircleIcon } from "@heroicons/react/solid";
import { SearchIcon } from "../icons";
import { useEffect, useRef } from "react";
import { useApp } from "#/hooks/useApp";
import { SchemaName } from "#/types/schema";

export default function SearchBar({ className, placeHolder,
  onSearchSubmit,
  searchSchemaName
}: { 
  className?: string, 
  searchSchemaName: SchemaName,
  placeHolder?: string, 
  onSearchSubmit: (searchResult: string) => any  
}) {
  const mongoApp = useApp()
  const submitValue = "submit data"
  
  useEffect( () => {}, 
  [])
    return (
      <div
        className={`flex flex-row items-center ${className || ""}`}
      >
       <input type="text" className="rounded-md" placeholder={placeHolder || "Searchbar placeholder not set"}/>
       <button type="button" className="" onClick={() => {
         onSearchSubmit(submitValue)
       }}><SearchIcon/></button>
       
      </div>
    );
  }
  