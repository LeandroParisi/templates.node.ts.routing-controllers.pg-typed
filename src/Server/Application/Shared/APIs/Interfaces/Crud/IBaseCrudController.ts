/* eslint-disable import/export */
import { Request } from 'express'
import { BaseUpdatableEntity } from '../../../../../Domain/Entities/BaseClasses/BaseEntity'
import BaseSoftDeleteController from '../../BaseClasses/BaseCrudServices'
import BaseResponse from '../../BaseClasses/Responses/BaseResponse'

export interface IBaseCrudController<Entity extends BaseUpdatableEntity, Service> {
  Service : Service
  Get(query : any, req : Request) : Promise<Entity[]>
  Create(body : any, req : Request) : Promise<Entity>
  Update(body : any, req : Request, id? : number) : Promise<BaseResponse>
}

export interface IBaseSoftDeleteController<Entity extends BaseUpdatableEntity> {
  Service : BaseSoftDeleteController<Entity>
  Activate(req : Request, id? : number) : Promise<BaseResponse>
  Deactivate(req : Request, id? : number) : Promise<BaseResponse>
}
