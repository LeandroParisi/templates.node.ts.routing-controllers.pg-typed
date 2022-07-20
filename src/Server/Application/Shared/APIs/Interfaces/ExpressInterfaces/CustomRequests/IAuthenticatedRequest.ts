import { Request } from 'express'
import IUserToken from '../../../../../Contexts/Authentication/Interfaces/IUserToken'

export default interface IAuthenticatedRequest extends Request {
  user : IUserToken
}
