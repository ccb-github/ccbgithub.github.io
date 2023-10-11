/**
 * @description This is a general type for table props
 * @type
 * @example GeneralDataTableWrapperProps<{_id: string}>
 */
export type GeneralDataTableWrapperProps<DataItem extends { _id: string }> = {
  data: DataItem[]
  lng: string
}
