/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import theoretically from 'jest-theories'
import WhereQueryBuilder from '../../../../../../Server/Infrastructure/PgTyped/QueryBuilders/WhereQueryBuilder'
import { RandomCamelCaseObject } from '../../../../../Shared/Mocks/Randoms/RandomCamelCaseObject'

describe('Where query builder unit tests', () => {
  const theories = [
    { numberOfParameters: 1, numberOfLikes: 1 },
    { numberOfParameters: 3, numberOfLikes: 2 },
    { numberOfParameters: 4, numberOfLikes: 2 },
    { numberOfParameters: 5, numberOfLikes: 3 },
  ]

  theoretically(
    '1. It should return proper string for {numberOfParameters}',
    theories,
    ({ numberOfLikes, numberOfParameters }) => {
      // Arrange
      const object = new RandomCamelCaseObject()
      const fields = Object.keys(object).sort(() => Math.random() - 0.5)

      const query : Partial<RandomCamelCaseObject> = {}
      const likeFields : Array<keyof RandomCamelCaseObject> = []

      for (let i = 1; i <= numberOfParameters; i += 1) {
        const field = fields.pop()
        query[field] = object[field]
      }

      const queryFields = Object.keys(query).sort(() => Math.random() - 0.5)

      for (let i = 0; i < numberOfLikes; i += 1) {
        likeFields.push(queryFields[i] as keyof RandomCamelCaseObject)
      }

      // Act
      const result = WhereQueryBuilder.BuildWhereStatement(query, likeFields)

      // Assert
      const r = result.split(' ')
      const likes = r.filter((p) => p === 'LIKE')
      const ands = r.filter((p) => p === 'AND')
      const wheres = r.filter((p) => p === 'WHERE')
      const equalities = r.filter((p) => p === '=')

      expect(likes.length).toBe(numberOfLikes)
      expect(ands.length).toBe(numberOfParameters - 1)
      expect(wheres.length).toBe(1)
      expect(equalities.length).toBe(numberOfParameters - numberOfLikes)
    },
  )
})
