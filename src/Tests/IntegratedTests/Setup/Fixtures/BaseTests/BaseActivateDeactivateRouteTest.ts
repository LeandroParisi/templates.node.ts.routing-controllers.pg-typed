import express from 'express'
import request from 'supertest'
import { BaseRoutes } from '../../../../../Server/Application/Shared/APIs/Enums/Routes'
import DbSetup from '../DbSetup/DbSetup'

export default abstract class BaseActivateDeactivateRouteTest {
  public BaseRoute : BaseRoutes

  public entityId? : number

  public dbSetup : DbSetup

  public token? : string

  public type = 'activate' || 'deactivate'

  public response? : request.Response

  /**
   *
   */
  constructor(
    baseRoute : BaseRoutes, type : 'activate' | 'deactivate', dbSetup : DbSetup,
  ) {
    this.BaseRoute = baseRoute
    this.dbSetup = dbSetup
    this.type = type
  }

  abstract Arrange(isActive : boolean)

  async Act(app : express.Express) {
    const response = await request(app)
      .patch(`/api/${this.BaseRoute}/${this.type}/${this.entityId}`)
      .set('authorization', this.token)

    this.response = response
  }
}
