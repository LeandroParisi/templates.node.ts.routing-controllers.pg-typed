/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-use-before-define */
import chai, { assert } from 'chai'
import 'reflect-metadata'
import TypeUtils from '../../../../../Commons/Utils/TypeUtils'
import { CaseSerializer } from '../../../../../Server/Application/Shared/Serializers/CaseSerializer'
import { RandomCamelCaseObject } from '../../../../Shared/Mocks/Randoms/RandomCamelCaseObject'
import { RandomSnakeCaseObject } from '../../../../Shared/Mocks/Randoms/RandomSnakeCaseObject'

const random = require('random-object-generator')

chai.should()

describe('Case Serializer tests', () => {
  it('1. Should properlly map from snake to camel case', () => {
    const object = random.randomObject(new RandomSnakeCaseObject())
    const camelCased = CaseSerializer.CastToCamel(object)

    IsObjectProperllySerialized(camelCased, new RegExp('[A-Z]'))
  })

  it('2. Should properlly map from camel to snake case', () => {
    const object = random.randomObject(new RandomCamelCaseObject())
    const snakeCase = CaseSerializer.CastToSnake(object)

    IsObjectProperllySerialized(snakeCase, new RegExp('_'))
  })

  it('3. Should properlly map array from snake to camel case', () => {
    const object = random.randomObject(new RandomSnakeCaseObject())
    const object2 = random.randomObject(new RandomSnakeCaseObject())
    const camelCased = CaseSerializer.CastArrayToCamel([object, object2])

    camelCased.forEach((c) => IsObjectProperllySerialized(c, new RegExp('[A-Z]')))
  })

  it('4. Should properlly map array from camel to snake case', () => {
    const object = random.randomObject(new RandomCamelCaseObject())
    const object2 = random.randomObject(new RandomCamelCaseObject())
    const snakeCase = CaseSerializer.CastArrayToSnake([object, object2])

    snakeCase.forEach((c) => IsObjectProperllySerialized(c, new RegExp('_')))
  })
})

function IsObjectProperllySerialized(camelCased: any, regexp : RegExp) {
  Object.keys(camelCased).forEach((key : string) => {
    if (TypeUtils.IsArray(camelCased[key]) && TypeUtils.IsObject(camelCased[key][0])) {
      IsObjectProperllySerialized(camelCased[key][0], regexp)
    } else if (TypeUtils.IsObject(camelCased[key])) {
      IsObjectProperllySerialized(camelCased[key], regexp)
    } else {
      const isCorrect = regexp.test(key)
      assert.isTrue(isCorrect)
    }
  })
}
