import DoubleCell from "#/components/common/table/cell/DoubleCell"
import IntCell from "#/components/common/table/cell/IntCell"
import ObjectIdCell from "#/components/common/table/cell/ObjectIdCell"
import StringCell from "#/components/common/table/cell/StringCell"
import { SchemaDataPropType } from "#/types/schema"

function CustomRender({
  value,
  dataType,
}: {
  value: unknown
  dataType: SchemaDataPropType
}) {
  console.log(`The datatype in render ${dataType}`)
  switch (dataType) {
    case "int":
      return <IntCell value={value} />
    case "double":
      return <DoubleCell value={value} />
    case "string":
      return <StringCell value={value} />
    case "objectId":
      return <ObjectIdCell value={value} />

    case "date":
      return <p>{value as string}</p>
    default:
      return <p>{JSON.stringify(value)}</p>
  }
}

export { CustomRender }
