import { ErrorMessages } from '../../APIs/Enums/Messages'
import { StatusCode } from '../../APIs/Enums/Status'
import ApiError from '../ApiError'

export class InexistentUserError extends ApiError {
  constructor(innerError? : Error) {
    super(StatusCode.NOT_FOUND, ErrorMessages.UserNotFound, innerError)
  }
}
