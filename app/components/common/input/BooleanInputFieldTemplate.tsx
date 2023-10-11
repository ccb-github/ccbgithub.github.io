import { SchemaProperty } from "#/types/schema"


import TypeSpan from "./TypeSpan"

export default function BooleanInputFieldTemplate(props: SchemaProperty) {
    
    return (
      <div key={props.name} className="form-group">
        <div className="w-full p-4 ">
          <label className=" control-label" htmlFor="prop.name">
            {"*"}{props.name}
          </label>
          <TypeSpan text='boolean' className='float-right'/>
        </div>
        <div className="w-full space-x-1 pl-4"> 
          <label>
            True
            <input
              name={props.name}
              type="radio"
              value={"true"}
              className="form-control input-md"
              required={props.optional}
            />
          </label>
          <label>
            False
           <input
            name={props.name}
            type="radio"
            value={"false"}
            className="form-control input-md"
            required={props.optional}
          />
          </label>
        </div>
      </div>
    )
  }