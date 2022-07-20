import { NextFunction, Request, Response } from 'express'

export type MiddlewareFn = (req : Request, res : Response, next : NextFunction) => Promise<void>
