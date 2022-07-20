/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import fs from 'fs/promises'
import path from 'path'
import { Service } from 'typedi'
import { CaseSerializer } from '../../../../../../Application/Shared/Serializers/CaseSerializer'
import City from '../../DTOs/City'
import Country from '../../DTOs/Country'

import { LocationsDTO } from '../../DTOs/LocationDto'
import State from '../../DTOs/State'
import IGenerateSeedStrategy from '../../Interfaces/IGenerateSeedStrategy'

@Service()
export default class CSCJsonStrategy implements IGenerateSeedStrategy {
  private static CountriesJsonUrl = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json'

  private static StatesJsonUrl = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json'

  private static CitiesJsonUrl = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json'

  private static LocalCountriesJsonPath = path.join(__dirname, './JsonFiles/countries.json')

  private static LocalStatesJsonPath = path.join(__dirname, './JsonFiles/states.json')

  private static LocalCitiesJsonPath = path.join(__dirname, './JsonFiles/cities.json')

  public async Generate(): Promise<LocationsDTO> {
    const countriesJson = await fs
      .readFile(CSCJsonStrategy.LocalCountriesJsonPath, 'utf-8')
      .then((r) => CaseSerializer.CastArrayToCamel<Object, Country>(JSON.parse(r))) as Array<Partial<Country>>

    const statesJson = await fs
      .readFile(CSCJsonStrategy.LocalStatesJsonPath, 'utf-8')
      .then((r) => CaseSerializer.CastArrayToCamel<Object, State>(JSON.parse(r))) as Array<Partial<State>>

    const citiesJson = await fs
      .readFile(CSCJsonStrategy.LocalCitiesJsonPath, 'utf-8')
      .then((r) => CaseSerializer.CastArrayToCamel<Object, City>(JSON.parse(r))) as Array<Partial<City>>

    const countries : Country[] = countriesJson.map(({
      currency, emoji, iso2, iso3, name, phoneCode, id,
    }) => ({
      id, currency, emoji, iso2, iso3, name: this.ReplaceNameSignals(name), phoneCode,
    })).sort((a, b) => Number(a.id) - Number(b.id))

    const states : State[] = statesJson.map(({
      name, countryId, id, stateCode,
    }) => ({
      countryId, name: this.ReplaceNameSignals(name), stateCode, id,
    })).sort((a, b) => Number(a.id) - Number(b.id))

    const cities : City[] = citiesJson.map(({
      name, stateId, id,
    }) => ({ name: this.ReplaceNameSignals(name), stateId, id })).sort((a, b) => Number(a.id) - Number(b.id))

    return {
      countries,
      states,
      cities,
    }
  }

  private CorrectStateCountryCode(country_code: string, country_name: string): string {
    if (this.ReplaceNameSignals(country_name) === 'Hong Kong S.A.R.') {
      return 'HK'
    }
    return country_code
  }

  private ReplaceNameSignals(name : string) {
    return name.replace(new RegExp("'", 'g'), '`')
  }
}
