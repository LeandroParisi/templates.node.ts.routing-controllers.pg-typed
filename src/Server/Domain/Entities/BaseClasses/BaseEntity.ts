/* eslint-disable max-classes-per-file */
export abstract class BaseEntity {
  id : number
}

export abstract class BaseUpdatableEntity extends BaseEntity {
  createdAt? : Date

  updatedAt? : Date

  isActive? : boolean
}
