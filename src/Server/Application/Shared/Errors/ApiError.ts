import { StatusCode } from '../APIs/Enums/Status'

export default class ApiError extends Error {
  statusCode : StatusCode

  innerError? : Error | undefined

  constructor(statusCode : StatusCode, message : string, innerError? : Error) {
    super()
    this.statusCode = statusCode
    this.message = message
    this.innerError = innerError
  }
}
