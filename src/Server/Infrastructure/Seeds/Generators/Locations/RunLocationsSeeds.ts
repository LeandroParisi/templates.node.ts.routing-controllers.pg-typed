import 'reflect-metadata'
import GenerateLocationsSeeds, { Strategies } from './GenerateLocationsSeeds'

GenerateLocationsSeeds.GenerateSeeds(Strategies.CscJson)
  .then((r) => console.log('GeneratedSeeds successfully'))
  .catch((r) => console.log('Problem Generating seeds'))
