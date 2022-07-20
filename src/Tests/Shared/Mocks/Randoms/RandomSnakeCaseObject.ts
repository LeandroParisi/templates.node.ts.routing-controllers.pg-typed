/* eslint-disable camelcase */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-use-before-define */
// DOCS: https://www.npmjs.com/package/random-object-generator
const _random = require('random-object-generator')

export class RandomSnakeCaseObject {
  prop_one : any

  prop_two: any

  prop_three: any

  prop_four: any

  prop_five : any

  /**
   *
   */
  constructor() {
    this.prop_one = 'id'
    this.prop_two = 'int'
    this.prop_three = 'string'
    this.prop_four = [new RandomSnakeCaseObjectTwo()]
    this.prop_five = new RandomSnakeCaseObjectThree()
  }
}

export class RandomSnakeCaseObjectTwo {
  prop_one : any

  prop_two : any

  prop_three : any

  /**
   *
   */
  constructor() {
    this.prop_one = 'id'
    this.prop_two = 'int'
    this.prop_three = [new RandomSnakeCaseObjectThree()]
  }
}

export class RandomSnakeCaseObjectThree {
  prop_one : any

  prop_two : any

  prop_three : any

  /**
 *
 */
  constructor() {
    this.prop_one = 'id'
    this.prop_two = 'int'
    this.prop_three = 'string'
  }
}
