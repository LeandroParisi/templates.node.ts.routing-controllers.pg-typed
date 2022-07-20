import { JwtPayload, sign, verify } from 'jsonwebtoken'
import CONSTANTS from '../../../../../Commons/Configuration/constants'
import IUserToken from '../Interfaces/IUserToken'

require('dotenv/config')

export default class JwtConfig {
  static BaseConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  static LongerConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  private static CreateJWTPayload(user : IUserToken) : JwtPayload {
    return {
      iss: 'WhatsappApp',
      aud: 'identity',
      userData: user,
    }
  }

  static GenerateToken(user : IUserToken, jwtConfig : object) : string {
    const payload = JwtConfig.CreateJWTPayload(user)
    const token = sign(payload, CONSTANTS.SALT_SECRET, jwtConfig)
    return token
  }

  static Decode(token : string) : JwtPayload {
    return verify(token, CONSTANTS.SALT_SECRET) as JwtPayload
  }
}
