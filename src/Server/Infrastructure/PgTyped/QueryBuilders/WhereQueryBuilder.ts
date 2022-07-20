/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-underscore-dangle */
import { sql, SQLQuery } from '@databases/pg'
import { Service } from 'typedi'
import { CaseSerializer } from '../../../Application/Shared/Serializers/CaseSerializer'

@Service()
export default class WhereQueryBuilder {
  public static BuildWhereStatement<Entity>(entity : Partial<Entity>, likeFields? : Array<keyof Entity>) : string {
    let query = ''

    Object.entries(entity).forEach(([key, value]) => {
      const k = CaseSerializer.ToSnake(key)
      const v = value as string
      const equality = likeFields
        ? WhereQueryBuilder.BuildEquality<Entity>(k, v, likeFields)
        : WhereQueryBuilder.BuildEquality<Entity>(k, v)

      if (!query.length) {
        query += `WHERE ${k} ${equality}`
      } else {
        query += ` AND ${k} ${equality}`
      }
    })

    return query
  }

  private static BuildEquality<Entity>(key: string, value : string, likeFields?: Array<keyof Entity>) {
    const likeSet = new Set(likeFields.map((f) => CaseSerializer.ToSnake(f as string)))

    if (likeSet.has(key)) {
      return `LIKE '%${value}%'`
    }
    return `= ${value}`
  }

  public static BuildInSet<T>(values : T[]) : SQLQuery {
    return sql.__dangerous__rawValue(`(${values.map((p) => `'${p}'`).join(', ')})`)
  }
}
