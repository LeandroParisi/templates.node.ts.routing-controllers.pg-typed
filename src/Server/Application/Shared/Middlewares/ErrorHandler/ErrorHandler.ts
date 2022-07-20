/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ValidationError } from 'class-validator'
import { Response } from 'express'
import {
  BadRequestError,
  ExpressErrorMiddlewareInterface, HttpError, Middleware,
} from 'routing-controllers'
import { Service } from 'typedi'
import { Logger } from '../../../../../Commons/Logger'
import { ErrorMessages } from '../../APIs/Enums/Messages'
import { StatusCode } from '../../APIs/Enums/Status'
import ApiError from '../../Errors/ApiError'
import { ApiValidationError, IValidationError } from '../../Errors/ApiValidationError'

@Service()
@Middleware({ type: 'after' })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface {
  public error(error: Error, _request: any, response: Response, next: (err?: any) => any) : void {
    let errorToBeSent = error as ApiError

    Logger.error(errorToBeSent)

    if (error instanceof ApiError) {
      errorToBeSent = error
    } else if (error instanceof HttpError) {
      errorToBeSent = this.FormatError(error)
    } else {
      errorToBeSent = new ApiError(StatusCode.INTERNAL_SERVER_ERROR, ErrorMessages.InternalError, error)
    }

    this.SendError(errorToBeSent, response)

    next()
  }

  private SendError(errorToBeSent: ApiError, response: Response<any, Record<string, any>>) {
    if (errorToBeSent.innerError) {
      // eslint-disable-next-line no-param-reassign
      delete errorToBeSent.innerError
    }

    response.status(errorToBeSent.statusCode)
    response.json(errorToBeSent)
  }

  private FormatError(error: HttpError) : ApiError {
    if (error instanceof BadRequestError) {
      const { errors } = error as any
      const validationErrors = this.FormatValidationErrors(errors as ValidationError[])
      return new ApiValidationError(validationErrors as unknown as IValidationError[], error)
    }
    return new ApiError(error.httpCode, error.message)
  }

  private FormatValidationErrors(validationErrors: ValidationError[]) : IValidationError[] | IValidationError {
    const output : IValidationError[] = validationErrors.flatMap((error) => {
      const {
        children, constraints, property, target,
      } = error

      if (children.length) {
        const newChildren = children.map((c) => ({
          ...c,
          property: `${property}.${c.property}`,
        }))
        return this.FormatValidationErrors(newChildren)
      }
      if (constraints) {
        return [{
          field: property,
          errors: Object.values(constraints).join(', '),
        }]
      }
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new ApiError(StatusCode.INTERNAL_SERVER_ERROR, `Unable to map error ${error}`)
    })

    return output
  }

  FormatValidationError(error : ValidationError) : IValidationError[] | IValidationError {
    const { children, constraints, property } = error
    let validationError : IValidationError[] | IValidationError

    if (children) {
      validationError = this.FormatValidationErrors(children)
    } else if (constraints) {
      validationError = {
        field: property,
        errors: Object.values(constraints).join(', '),
      }
    }

    return validationError
  }
}
