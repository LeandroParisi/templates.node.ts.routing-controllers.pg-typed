/* eslint-disable max-len */
import fs from 'fs/promises'
import path from 'path'
import Container, { Service } from 'typedi'
import IDictionary from '../../../../../Commons/Interfaces/SystemInterfaces/IDictionary'
import City from './DTOs/City'
import Country from './DTOs/Country'

import { LocationsDTO } from './DTOs/LocationDto'
import State from './DTOs/State'
import IGenerateSeedStrategy from './Interfaces/IGenerateSeedStrategy'
import CSCJsonStrategy from './Strategies/CSCJson/CSCJsonStrategy'

export const Strategies = {
  CscJson: 'CscJson',
} as const

export type StrategyKeys = keyof typeof Strategies;
export type StrategyValues = typeof Strategies[StrategyKeys];

@Service()
export default class GenerateLocationsSeeds {
  private static SeedScriptsPath = path.join(__dirname, '../../Scripts/1.1_seed_locations.sql')

  private static UnSeedScriptsPath = path.join(__dirname, '../../Scripts/1.2_unseed_locations.sql')

  private static Strategies : IDictionary<IGenerateSeedStrategy> = {
    [Strategies.CscJson]: Container.get(CSCJsonStrategy),
  }

  public static async GenerateSeeds(strategy : StrategyValues) {
    try {
      const generator = this.Strategies[strategy]

      const locations = await generator.Generate()

      await this.WriteSeedFile(locations)
    } catch (error) {
      console.log('Error trying to generate seeds:\n')
      console.log({ error })
    }
  }

  private static async WriteSeedFile(locations: LocationsDTO) {
    const { cities, countries, states } = locations

    const insertCountriesScript = `INSERT INTO countries (id, name, iso2, iso3, phone_code, currency, emoji)\nVALUES\n${this
      .GenerateInsertCountryValue(countries)}`

    const insertStatesScript = `INSERT INTO states (id, country_id, name, state_code)\nVALUES\n${this
      .GenerateInsertStateValue(states)}`

    const insertCitiesScript = `INSERT INTO cities (id, state_id, name)\nVALUES\n${this
      .GenerateInsertCityValue(cities)}`

    await fs.writeFile(this.SeedScriptsPath, insertCountriesScript)

    await fs.appendFile(this.SeedScriptsPath, '\n\n\n\n')

    await fs.appendFile(this.SeedScriptsPath, insertStatesScript)

    await fs.appendFile(this.SeedScriptsPath, '\n\n\n\n')

    await fs.appendFile(this.SeedScriptsPath, insertCitiesScript)

    await fs.writeFile(this.UnSeedScriptsPath, 'DELETE FROM cities;\nDELETE FROM states;\nDELETE FROM countries;')
  }

  private static GenerateInsertCityValue(cities: City[]) {
    const citiesRows = cities
      .map((s) => `  (${s.id}, ${s.stateId}, '${s.name}')`)

    return `${citiesRows.join(',\n')};`
  }

  private static GenerateInsertStateValue(states: State[]) {
    const statesRows = states
      .map((s) => (
        `  (${s.id},${s.countryId}, '${s.name}', '${s.stateCode}')`))

    return `${statesRows.join(',\n')};`
  }

  private static GenerateInsertCountryValue(countries : Country[]) {
    const countriesRows = countries.map((c) => (
      `  (${c.id}, '${c.name}', '${c.iso2}', '${c.iso3}', '${c.phoneCode}', '${c.currency}', '${c.emoji}')`))

    return `${countriesRows.join(',\n')};`
  }
}
