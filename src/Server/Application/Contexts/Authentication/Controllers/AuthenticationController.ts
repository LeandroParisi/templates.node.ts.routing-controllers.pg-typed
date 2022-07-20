// import {
//   Body, JsonController,
//   Post,
// } from 'routing-controllers'
// import { Service } from 'typedi'
// import { UserRepository } from '../../../../Infrastructure/PgTyped/Repositories/UserRepository'
// import { ErrorMessages } from '../../../Shared/APIs/Enums/Messages'
// import { StatusCode } from '../../../Shared/APIs/Enums/Status'
// import ApiError from '../../../Shared/Errors/ApiError'
// import JwtConfig from '../Hashing/JwtConfig'
// import PasswordHashing from '../Hashing/PasswordHashing'
// import { ILoginPayload } from './Requests/Login/ILoginPayload'

// @Service()
// @JsonController('/authentication')
// export class AuthenticationController {
//   /**
//    *
//    */
//   constructor(private userRepository : UserRepository) { }

//   @Post('/login')
//   public async Login(@Body() loginReq : ILoginPayload) : Promise<string> {
//     const { email, password } = loginReq
//     const user = await this.userRepository.FindOne({ email })

//     if (!user) throw new ApiError(StatusCode.NOT_FOUND, ErrorMessages.NotFound)

//     try {
//       await PasswordHashing.VerifyPassword(password, user.password)
//     } catch (error) {
//       throw new ApiError(StatusCode.UNAUTHORIZED, ErrorMessages.Unauthorized)
//     }

//     const token = JwtConfig.GenerateToken({ email, id: user.id }, JwtConfig.LongerConfig)

//     return token
//   }
// }
