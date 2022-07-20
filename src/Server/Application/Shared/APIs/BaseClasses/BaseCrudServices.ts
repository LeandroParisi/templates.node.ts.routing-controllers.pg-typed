import { Service } from 'typedi'
import { BaseUpdatableEntity } from '../../../../Domain/Entities/BaseClasses/BaseEntity'
import { IBaseRepository } from '../../Database/Repositories/IRepository'
import ApiError from '../../Errors/ApiError'
import { StatusCode } from '../Enums/Status'

@Service()
export default class BaseSoftDeleteController<Entity extends BaseUpdatableEntity> {
  public Repository : IBaseRepository<Entity>

  /**
   *
   */
  constructor(
    repository : IBaseRepository<Entity>,
  ) {
    this.Repository = repository
  }

  public async Deactivate(id : number, additionalQuery? : Partial<Entity>) : Promise<boolean> {
    try {
      const deactivate = { isActive: false } as Partial<Entity>
      const isUpdated = await this.Repository.UpdateOne({ ...additionalQuery, id, isActive: true }, deactivate)
      return isUpdated
    } catch (e) {
      throw new ApiError(StatusCode.INTERNAL_SERVER_ERROR, 'Unable to update entity', e)
    }
  }

  public async Activate(id : number, additionalQuery? : Partial<Entity>) : Promise<boolean> {
    try {
      const activate = { isActive: true } as Partial<Entity>
      const isUpdated = await this.Repository.UpdateOne({ ...additionalQuery, id, isActive: false }, activate)
      return isUpdated
    } catch (e) {
      throw new ApiError(StatusCode.INTERNAL_SERVER_ERROR, 'Unable to update entity', e)
    }
  }
}
