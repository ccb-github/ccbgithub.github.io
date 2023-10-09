"use client"
import React from "react"
import type { SchemaProperty } from "#/types/schema"
import TypeSpan from "#/components/common/input/TypeSpan"

export function StringInputFieldTemplate(props: SchemaProperty) {
  return (
    <div key={props.name} className="form-group">
      <div className="w-full p-4">
        <label className=" control-label" htmlFor={props.name}>
          {props.name}
        </label>
        <TypeSpan text="string" className="float-right" />
      </div>
      <div className=" w-full">
        <input
          name={props.name}
          type="text"
          defaultValue={props.defaultValue}
          placeholder={`please Enter your ${props.name} here`}
          className="form-control input-md w-full"
          required={!props.optional}
        />
      </div>
    </div>
  )
}
