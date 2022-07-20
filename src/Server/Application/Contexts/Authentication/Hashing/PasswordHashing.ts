import { compare, hash } from 'bcrypt'

export default class PasswordHashing {
  static async HashPassword(password : string) {
    const hashedPassword = await hash(password, 10)
    return hashedPassword
  }

  static async VerifyPassword(password : string, hashedPassword : string) {
    const isPasswordCorrect = await compare(password, hashedPassword)
    return isPasswordCorrect
  }
}
