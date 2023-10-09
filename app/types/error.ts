export type ErrorWithMessage = {
  message?: string
}
export type ErrorWithErrorCode = {
  errorCode?: string
}
export interface GeneralError extends ErrorWithMessage, ErrorWithErrorCode {}
