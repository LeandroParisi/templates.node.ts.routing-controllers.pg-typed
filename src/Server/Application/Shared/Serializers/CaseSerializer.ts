/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import StaticImplements from '../../../../Commons/Anotations/StaticImplements'
import TypeUtils from '../../../../Commons/Utils/TypeUtils'
import { StatusCode } from '../APIs/Enums/Status'
import ApiError from '../Errors/ApiError'

@StaticImplements()
export class CaseSerializer {
  static CastToCamel<Input, Output>(dbModel : Input) : Output {
    return this.KeysToCamel(dbModel) as Output
  }

  static CastArrayToCamel<Input, Output>(dbModel : Input[]) : Output[] {
    return this.KeysToCamel(dbModel) as Output[]
  }

  static CastToSnake<Input, Output>(domainModel : Input) : Output {
    return this.KeysToSnake(domainModel) as Output
  }

  static CastArrayToSnake<Input, Output>(domainModel : Input[]) : Output[] {
    return this.KeysToSnake(domainModel) as Output[]
  }

  private static KeysToCamel(o : any) {
    try {
      if (TypeUtils.IsDate(o)) {
        return o
      }
      if (TypeUtils.IsObject(o)) {
        const n = {}

        Object.keys(o)
          .forEach((k) => {
            n[CaseSerializer.ToCamel(k)] = CaseSerializer.KeysToCamel(o[k])
          })

        return n
      } if (TypeUtils.IsArray(o)) {
        return o.map((i) => CaseSerializer.KeysToCamel(i))
      }
      return o
    } catch (error) {
      throw new ApiError(
        StatusCode.INTERNAL_SERVER_ERROR,
        'Unable to parse db object to Domain object: CaseSerializer.KeysToCamel',
        error,
      )
    }
  }

  private static KeysToSnake(o : any) {
    try {
      if (TypeUtils.IsDate(o)) {
        return o
      }
      if (TypeUtils.IsObject(o)) {
        const n = {}

        Object.keys(o)
          .forEach((k) => {
            n[CaseSerializer.ToSnake(k)] = CaseSerializer.KeysToSnake(o[k])
          })

        return n
      } if (TypeUtils.IsArray(o)) {
        return o.map((i) => CaseSerializer.KeysToSnake(i))
      }
      return o
    } catch (error) {
      throw new ApiError(
        StatusCode.INTERNAL_SERVER_ERROR,
        'Unable to parse db object to Domain object: CaseSerializer.KeysToSnake',
        error,
      )
    }
  }

  public static ToSnake = (s : string) : string => s.replace(/[A-Z]/g, (letter : string) => `_${letter.toLowerCase()}`);

  public static ToCamel = (s : string) : string => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
    .replace('-', '')
    .replace('_', ''));
}
