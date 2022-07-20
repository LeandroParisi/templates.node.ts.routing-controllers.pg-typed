export default class ParsingError extends Error {
  innerError? : Error | undefined

  /**
   *
   */
  constructor(message : string, innerError? : Error) {
    super()
    this.message = message
    this.innerError = innerError
  }
}
