import TypeSpan from "#/components/common/input/TypeSpan"
import { SchemaProperty } from "#/lib/schema/format"

export default function DoubleFieldTemplate(props: SchemaProperty) {
  const DOUBLE_PRECISION = process.env["DOUBLE_PRECISION"]
  return (
    <div key={props.name} className="form-group">
      <div className="w-full p-4">
        <label className=" control-label" htmlFor={props.name}>
          {`${props.optional ? "" : "*"}${props.name}`}
        </label>
        <TypeSpan text="double" className="float-right" />
      </div>
      <div className="w-full">
        <input
          id={props.name}
          name={props.name}
          type="number"
          step={DOUBLE_PRECISION}
          required={props.optional}
          placeholder={`please Enter your ${props.name} here, precision up to ${DOUBLE_PRECISION}`}
          defaultValue={props.defaultValue}
          min={props.min || 0}
          className="form-control input-md w-full border-red-500"
        />
      </div>
    </div>
  )
}
