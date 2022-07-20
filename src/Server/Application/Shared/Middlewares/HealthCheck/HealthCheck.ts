/* istanbul ignore file */
import { Response } from 'express'
import { Controller, Get, Res } from 'routing-controllers'
import { Service } from 'typedi'
import { StatusCode } from '../../APIs/Enums/Status'

@Controller('/health')
@Service()
export default class HealthCheck {
  @Get()
  ExecuteAsync(@Res() res : Response) {
    return res.status(StatusCode.OK).send('Alive')
  }
}
