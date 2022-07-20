import { LocationsDTO } from '../DTOs/LocationDto'

export default interface IGenerateSeedStrategy {
  Generate() : Promise<LocationsDTO>
}
