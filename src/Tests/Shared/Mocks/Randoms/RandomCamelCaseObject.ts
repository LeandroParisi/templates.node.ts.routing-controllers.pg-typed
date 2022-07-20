/* eslint-disable camelcase */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-use-before-define */
// DOCS: https://www.npmjs.com/package/random-object-generator

export class RandomCamelCaseObject {
  propOne : any

  propTwo: any

  propThree: any

  propFour: any

  propFive : any

  /**
   *
   */
  constructor() {
    this.propOne = 'id'
    this.propTwo = 'int'
    this.propThree = 'string'
    this.propFour = [new RandomCamelCaseObjectTwo()]
    this.propFive = new RandomCamelCaseObjectThree()
  }
}

export class RandomCamelCaseObjectTwo {
  propOne : any

  propTwo : any

  propThree : any

  /**
   *
   */
  constructor() {
    this.propOne = 'id'
    this.propTwo = 'int'
    this.propThree = [new RandomCamelCaseObjectThree()]
  }
}

export class RandomCamelCaseObjectThree {
  propOne : any

  propTwo : any

  propThree : any

  /**
 *
 */
  constructor() {
    this.propOne = 'id'
    this.propTwo = 'int'
    this.propThree = 'string'
  }
}
