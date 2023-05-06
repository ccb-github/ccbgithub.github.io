import { SchemaPropties } from "#/types/schema";
import NormalButton from "../NormalButton";
import TypeSpan from "./TypeSpan";

export default function IntInputFieldTemplate(props: SchemaPropties) {
    const DATE_FORMAT = 'YYYY-MM-DD HH:MM:SS';
    
    
    return (
      <div key={props.name} className="form-group">
          <div className="w-full p-4">
            <label className=" control-label" htmlFor={props.name}>
              {props.name}
            </label>
            <TypeSpan text='int' className='float-right' 
            />
          </div>
          <div className="w-full">
            <input
              id={props.name}
              name={props.name}
              type="number"
              min={props.min || 0}
              className="form-control input-md w-full"
            />
          </div>
        </div>
    )
  }