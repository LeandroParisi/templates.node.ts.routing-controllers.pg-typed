// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable no-use-before-define */
// import { faker } from '@faker-js/faker'
// import { getMockReq, getMockRes } from '@jest-mock/express'
// import { assert } from 'chai'

// import { IncomingHttpHeaders } from 'http'
// import theoretically from 'jest-theories'
// import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
// import 'reflect-metadata'
// import {
//   anyNumber, anything, instance, mock, reset, when,
// } from 'ts-mockito'
// import JwtConfig from '../../../../../../../Server/Application/Contexts/Authentication/Hashing/JwtConfig'
// import IUserToken from '../../../../../../../Server/Application/Contexts/Authentication/Interfaces/IUserToken'
// import TokenAuthentication from '../../../../../../../Server/Application/Contexts/Authentication/Middlewares/TokenAuthentication'
// import { StatusCode } from '../../../../../../../Server/Application/Shared/APIs/Enums/Status'
// import IAuthenticatedRequest from '../../../../../../../Server/Application/Shared/APIs/Interfaces/ExpressInterfaces/CustomRequests/IAuthenticatedRequest'
// import ApiError from '../../../../../../../Server/Application/Shared/Errors/ApiError'
// import { InexistentUserError } from '../../../../../../../Server/Application/Shared/Errors/SpecificErrors/InexistentUserError'
// import { UserRepository } from '../../../../../../../Server/Infrastructure/PgTyped/Repositories/UserRepository'
// import UserMock from '../../../../../../Shared/Mocks/UserMock'

// interface TokenAuthenticationPayload {
//   hasHeaders : boolean
//   decodeError : boolean
//   invalidUser : boolean

// }

// describe('Token authentication middleware tests', () => {
//   const mockedUserRepository : UserRepository = mock(UserRepository)
//   const jwtDecodeMocked = jest.fn()
//   const { res, next, mockClear } = getMockRes()

//   const theories : Array<TokenAuthenticationPayload> = [
//     { hasHeaders: false, decodeError: false, invalidUser: false },
//     { hasHeaders: true, decodeError: true, invalidUser: false },
//     { hasHeaders: true, decodeError: false, invalidUser: true },
//   ]

//   beforeEach(() => {
//     TestSetup()
//   })

//   afterEach(() => {
//     jwtDecodeMocked.mockClear()
//     reset(mockedUserRepository)
//     mockClear()
//   })

//   theoretically('1. Should throw error when:', theories, async (theory) => {
//     // Arrange
//     const headers = MocksSetup(theory)
//     const req = getMockReq({ headers }) as unknown as IAuthenticatedRequest

//     // Act
//     try {
//       await new TokenAuthentication(instance(mockedUserRepository)).use(req, res, next)
//     } catch (e) {
//       AssertThrownError(e, theory)
//     }
//   })

//   it('2. Accept request if all information is valid', async () => {
//     // Arrange
//     const headers = MocksSetup({ hasHeaders: true, decodeError: false, invalidUser: false })
//     const req = getMockReq({ headers }) as unknown as IAuthenticatedRequest

//     // Act
//     await new TokenAuthentication(instance(mockedUserRepository)).use(req, res, next)

//     // Assert
//     expect(next).toBeCalled()
//   })

//   function TestSetup() {
//     JwtConfig.Decode = jwtDecodeMocked
//     jwtDecodeMocked.mockImplementation(() => ({
//       userData: {
//         email: faker.internet.email(),
//         id: faker.datatype.number(110),
//       } as IUserToken,
//     } as JwtPayload))
//   }

//   function MocksSetup(theory: TokenAuthenticationPayload) : IncomingHttpHeaders {
//     const { decodeError, hasHeaders, invalidUser } = theory
//     let headers : IncomingHttpHeaders = null

//     if (hasHeaders) {
//       headers = {
//         authorization: faker.datatype.string(100),
//       }
//     }
//     if (decodeError) {
//       jwtDecodeMocked.mockClear()
//       jwtDecodeMocked.mockImplementation(() => {
//         throw new JsonWebTokenError('Unit tests')
//       })
//     }
//     if (invalidUser) {
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//       when(mockedUserRepository.FindOne({ id: anyNumber() })).thenResolve(null)
//     } else {
//       when(mockedUserRepository.FindOne(anything())).thenResolve(UserMock.GetRandomUser(1, 1, 1, 1))
//     }
//     return headers
//   }
// })

// function AssertThrownError(e: ApiError, theory: TokenAuthenticationPayload) {
//   const { decodeError, hasHeaders, invalidUser } = theory

//   if (!hasHeaders) {
//     assert.instanceOf(e, ApiError)
//     assert.equal(e.statusCode, StatusCode.UNAUTHORIZED)
//   }
//   if (decodeError) {
//     assert.instanceOf(e, ApiError)
//     assert.isNotNull(e.innerError)
//     assert.instanceOf(e.innerError, JsonWebTokenError)
//     assert.equal(e.statusCode, StatusCode.UNAUTHORIZED)
//   }
//   if (invalidUser) {
//     assert.instanceOf(e, ApiError)
//     assert.isNotNull(e.innerError)
//     assert.instanceOf(e.innerError, InexistentUserError)
//     assert.equal(e.statusCode, StatusCode.NOT_FOUND)
//   }
// }
