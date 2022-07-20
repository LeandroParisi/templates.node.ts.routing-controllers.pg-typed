/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BaseResponse from './BaseResponse'

export default class PostReponse extends BaseResponse {
  public insertedEntity : any

  /**
   *
   */
  constructor(entity : any, message : string) {
    super(message)
    this.insertedEntity = entity
  }
}
