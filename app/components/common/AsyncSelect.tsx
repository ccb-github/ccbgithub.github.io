"use client"
import { SchemaResultMapper } from "#/types/schema"
import { useEffect, useRef, useState } from "react"
import { MultiValue } from "react-select"

export interface ColourOption<ValueType = string> {
  readonly value: ValueType
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}
import AsyncSelectOri from "react-select/async"


const AsyncSelect = ({
  selectName = "defaultNameAsyncSelect",
  inputId,
  loadFunction,
  asyncLoadOptions
}: {
  selectName?: string
  inputId?: string
  asyncLoadOptions?: () => 
     Promise<ColourOption[]>
  loadFunction: () => Promise<
    Partial<Record<keyof SchemaResultMapper["Product"], string>>[]
  >
}) => {

  const helperRef = useRef<HTMLInputElement>(null)
  const [options, setOptions] = useState<readonly ColourOption<string>[]>([])
  const handleChange = (newValue: MultiValue<ColourOption<string>>) => {
    helperRef.current!.value = JSON.stringify(
      newValue.map((value) => value.value),
    )
  }
  console.log(asyncLoadOptions)
  return (
    <>
      <AsyncSelectOri
        onChange={handleChange}
        defaultOptions
        isMulti
        inputId={inputId}
        loadOptions={asyncLoadOptions}
      />
      <input className="hidden" name={selectName} ref={helperRef} />
    </>
  )
}


export default AsyncSelect
