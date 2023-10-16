import React from "react"

import RelatedObjSelect from "#/components/form/related/RelatedObjSelect"
import Button from "#/components/common/Button"
import DateInputFieldTemplate from "#/components/common/input/DateInputFieldTemplate"
import TypeSpan from "#/components/common/input/TypeSpan"
import IntInputFieldTemplate from "#/components/common/input/IntInputFieldTemplate"
import BooleanInputFieldTemplate from "#/components/common/input/BooleanInputFieldTemplate"
import { StringInputFieldTemplate } from "./input/StringInputFieldTemplate"
import AsyncSelect from "../common/AsyncSelect"
import { SchemaProperty, NormalSchemaName } from "#/lib/schema/format"

export function templateHTML(prop: SchemaProperty) {
  // const DATE_FORMAT = "YYYY-MM-DD HH:MM:SS"
  const DOUBLE_PRECISION = 0.0001
  const RESERVE_NAME = ["ownerId", "_id"]
  //prop.name is reserved, omit
  if (RESERVE_NAME.includes(prop.name)) {
    return null
  } else if (prop.relationSchemaName && prop.roleType === "select") {
    return (
      <div key={prop.name} className="form-group">
        <div className="w-full p-4">
          <label className="control-label" htmlFor={prop.name}>
            {prop.name}
            {prop.optional ? "" : "*"}
          </label>
        </div>
        <div className="w-full">
          <RelatedObjSelect
            objectType={prop.relationSchemaName}
            displayKey={"name"}
            name={prop.name}
          />
        </div>
      </div>
    )
  } else if (prop.dataType === "int") {
    return <IntInputFieldTemplate {...prop} key={prop.name} />
  } else if (prop.dataType === "double") {
    return (
      <div key={prop.name} className="form-group">
        <div className="w-full p-4">
          <label className=" control-label" htmlFor={prop.name}>
            {prop.name}
            {prop.optional ? "" : "*"}
          </label>
          <TypeSpan text="date" className="float-right" />
          <Button text="refresh" className="float-right" onClick={() => {}} />
        </div>
        <div className=" w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="number"
            step={DOUBLE_PRECISION}
            required={prop.optional}
            placeholder={`please Enter your ${prop.name} here, precision up to ${DOUBLE_PRECISION}`}
            className="form-control input-md w-full"
          />
        </div>
      </div>
    )
  } else if (prop.dataType === "date") {
    return <DateInputFieldTemplate key={prop.name} {...prop} />
  } else if (prop.dataType === "string") {
    return <StringInputFieldTemplate key={prop.name} {...prop} />
  } else if (prop.dataType === "bool") {
    return <BooleanInputFieldTemplate key={prop.name} {...prop} />
  } else if (prop.dataType === "list") {
    return (
      <div key={prop.name} className="form-group">
        <div className="w-full p-4">
          <label className="control-label" htmlFor={prop.name}>
            {prop.name}
            {prop.optional ? "" : "*"}
          </label>
        </div>
        <div className="w-full">
          <AsyncSelect selectName={prop.name} />
          {/* <input
            id={prop.name}
            name={prop.name}
            type="text"
            placeholder={`please Enter your ${prop.name} here`}
            className="form-control input-md w-full"
            required={!prop.optional}
          /> */}
        </div>
      </div>
    )
  } else if (prop.dataType === "object" && prop.objectType === "Location") {
    return (
      <div key={prop.name} className="form-group">
        <div>
          <label className=" control-label" htmlFor={prop.name}>
            {prop.name}
            {prop.optional ? "" : "*"}
          </label>
          <TypeSpan>location</TypeSpan>
        </div>
        <div className="w-full">
          <label className="control-label" htmlFor={`${prop.name}Longitude`}>
            {`${prop.name}.longitude`}
            <input
              id={`${prop.name}-longitude`}
              name={prop.name}
              type="text"
              placeholder={`please Enter your ${prop.name}.longitude here, Location content, required=${prop.optional}`}
            />
          </label>
          <br />
          <label className="control-label" htmlFor={`${prop.name}-latitude`}>
            latitude
          </label>
          <input
            id={`${prop.name}-latitude`}
            name={`${prop.name}`}
            type="text"
            placeholder={`please Enter your ${prop.name} latitude here, Location content`}
          />
        </div>
      </div>
    )
  }

  // onclick="this.focus();this.select();"
  else if (prop.dataType === "object" && prop.objectType === "Qrcode") {
    return (
      <div key={prop.name} className="form-group">
        <label className=" control-label" htmlFor={`${prop.name}`}>
          {prop.name}
          {prop.optional ? "" : "*"}
        </label>
        <div className=" w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="textarea"
            placeholder={`please Enter your ${
              prop.name
            } here,generate qrcode base on the content entered   ${
              prop.optional ? "" : "required"
            }`}
          />{" "}
        </div>
        <div id="qrcode" title="Preview of your qrcode"></div>
      </div>
    )
  } else {
    return (
      <div key={prop.name} className="form-group">
        <label className=" control-label" htmlFor={`${prop.name}`}>
          {prop.name}
          {prop.optional ? "" : "*"}
        </label>
        <div className="w-full flex-row">
          <RelatedObjSelect
            displayKey={"name"}
            objectType={prop.objectType as NormalSchemaName}
            className="flex-1 w-full"
          />
        </div>
      </div>
    )
  }
}
