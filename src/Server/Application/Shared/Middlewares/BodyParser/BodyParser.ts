/* eslint-disable @typescript-eslint/no-unsafe-call */
/* istanbul ignore file */
import * as bodyParser from 'body-parser'
import { NextFunction, Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { Service } from 'typedi'

@Service()
@Middleware({
  type: 'before',
  priority: 5,
})
export default class BodyParser implements ExpressMiddlewareInterface {
    private jsonBodyParser;

    constructor() {
      this.jsonBodyParser = bodyParser.json()
    }

    use(req: Request, res: Response, next: NextFunction) {
      this.jsonBodyParser(req, res, next)
    }
}
