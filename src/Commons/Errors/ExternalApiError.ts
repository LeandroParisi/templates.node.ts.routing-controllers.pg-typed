/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default class ExternalApiError extends Error {
status : number

innerError : Error

info : any

/**
 *
 */
constructor(status : number, info : any, innerError : Error) {
  super(info)

  this.status = status
  this.innerError = innerError
  this.info = info
}
}
