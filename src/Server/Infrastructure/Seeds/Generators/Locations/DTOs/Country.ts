import { Service } from 'typedi'
import { BaseUpdatableEntity } from '../../../../../Domain/Entities/BaseClasses/BaseEntity'

@Service()
export default class Country extends BaseUpdatableEntity {
  id : number

  name : string

  iso2 : string

  iso3 : string

  phoneCode : string

  currency : string

  emoji : string
}
