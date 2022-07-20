import { Service } from 'typedi'
import { BaseUpdatableEntity } from '../../../../../Domain/Entities/BaseClasses/BaseEntity'

@Service()
export default class City extends BaseUpdatableEntity {
  id: number

  stateId : number

  name : string
}
