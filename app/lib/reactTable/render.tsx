import DoubleCell from "#/components/common/table/cell/DoubleCell"
import IntCell from "#/components/common/table/cell/IntCell"
import LinkCell from "#/components/common/table/cell/LinkCell"
import StringCell from "#/components/common/table/cell/StringCell"
import ValueCell from "#/components/common/table/cell/ValueCell"
import { NormalSchemaName, SchemaDataPropType } from "#/lib/schema/format"

function CustomRender({
  value,
  dataType,
  relationSchemaName,
}: {
  value: unknown
  relationSchemaName?: NormalSchemaName

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
      return relationSchemaName ? (
        <LinkCell value={value} relLink={`${relationSchemaName}/${value}`} />
      ) : (
        <ValueCell value={value} />
      )

    case "date":
      return <p>{value as string}</p>
    default:
      return <p>{JSON.stringify(value)}</p>
  }
}

export { CustomRender }
