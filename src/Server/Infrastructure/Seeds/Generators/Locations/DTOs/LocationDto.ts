/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */

import City from './City'
import Country from './Country'
import State from './State'

export class LocationsDTO {
  countries : Country[]

  states : State[]

  cities : City[]
}
