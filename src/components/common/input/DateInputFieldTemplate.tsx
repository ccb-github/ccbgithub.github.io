import { SchemaPropties } from "#/types/schema"
import { useState } from "react"
import { FiRefreshCw } from "react-icons/fi"
import NormalButton from "../NormalButton"
import TypeSpan from "./TypeSpan"

export default function DateInputFieldTemplate(props: SchemaPropties) {
    const [currentTime, setRefreshedTime] = useState(new Date().toISOString().slice(0, -1))
    return (
      <div key={props.name} className="form-group">
        <div className="w-full p-4 ">
          <label className=" control-label" htmlFor="prop.name">
            {props.optional ? null :"*" }{props.name}
          </label>
          <TypeSpan text='date' className='float-right'/>
          
          <NormalButton text={"refresh"} className='float-right' onClick={() => {
            console.log(currentTime)
            setRefreshedTime(new Date().toISOString().slice(0, -1))
          }}>
            <FiRefreshCw className="w-4"/>
          </NormalButton>
        </div>
        <div className="w-full">
          <input
            id={props.name}
            name={props.name}
            type="datetime-local"
            defaultValue={currentTime}
            className="form-control input-md w-full"
            required={props.optional}
          />
        </div>
      </div>
    )
  }