// import { JsonWebTokenError } from 'jsonwebtoken'
// import { ExpressMiddlewareInterface } from 'routing-controllers'
// import { Service } from 'typedi'
// import { UserRepository } from '../../../../Infrastructure/PgTyped/Repositories/UserRepository'
// import { ErrorMessages } from '../../../Shared/APIs/Enums/Messages'
// import { StatusCode } from '../../../Shared/APIs/Enums/Status'
// import IAuthenticatedRequest from '../../../Shared/APIs/Interfaces/ExpressInterfaces/CustomRequests/IAuthenticatedRequest'
// import ApiError from '../../../Shared/Errors/ApiError'
// import { InexistentUserError } from '../../../Shared/Errors/SpecificErrors/InexistentUserError'
// import JwtConfig from '../Hashing/JwtConfig'
// import IUserToken from '../Interfaces/IUserToken'

// require('dotenv/config')

// @Service()
// export default class TokenAuthentication implements ExpressMiddlewareInterface {
//   /**
//    *
//    */
//   constructor(private userRepository : UserRepository) {}

//   async use(request: IAuthenticatedRequest, response: any, next: (err?: any) => any) {
//     if (!request.headers?.authorization?.length || request.headers == null) {
//       throw new ApiError(StatusCode.UNAUTHORIZED, 'Missing token, unable to authenticate user.')
//     }

//     const { authorization } = request.headers

//     try {
//       const userData = JwtConfig.Decode(authorization).userData as IUserToken

//       await this.CheckIsValidUser(userData)

//       request.user = { ...userData }

//       next()
//     } catch (error) {
//       if (error instanceof JsonWebTokenError) {
//         throw new ApiError(StatusCode.UNAUTHORIZED, 'Invalid token.', error)
//       }
//       if (error instanceof InexistentUserError) {
//         throw new ApiError(error.statusCode, error.message, error)
//       }
//       throw new ApiError(StatusCode.UNAUTHORIZED, ErrorMessages.InternalError, error)
//     }
//   }

//   async CheckIsValidUser(userData: IUserToken) {
//     let user = null
//     try {
//       user = await this.userRepository.FindOne({ id: userData.id })
//     } catch (e) {
//       throw new InexistentUserError(e)
//     }

//     if (!user) throw new InexistentUserError()
//   }
// }
