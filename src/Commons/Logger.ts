/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* istanbul ignore file */

import * as logger from 'winston'
import ApiError from '../Server/Application/Shared/Errors/ApiError'
import CONSTANTS, { Envs } from './Configuration/constants'

const shouldLogOnFile = CONSTANTS.ENV === Envs.DSV || CONSTANTS.ENV === Envs.PROD
const shouldLogOnConsole = CONSTANTS.ENV === Envs.LOCAL
const shouldLog = CONSTANTS.ENV !== Envs.TEST
// const shouldLog = true
const date = new Date()
const fileName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`

const transports = GetTransportsBasedOnEnv()

logger.configure({
  level: 'debug',
  format: logger.format.combine(
    logger.format.colorize(),
    logger.format.simple(),
  ),
  transports,
})

export class Logger {
  public static readonly logFile: boolean = shouldLogOnFile;

  public static readonly console = logger;

  public static log(...args: any[]): void {
    AttemptLog(() => Logger.console.debug(Logger.formatArgs(args)))
  }

  public static warn(...args: any[]): void {
    AttemptLog(() => Logger.console.warn(Logger.formatArgs(args)))
  }

  public static error(error: Error): void {
    AttemptLog(() => {
      if (error instanceof ApiError) {
        Logger.console.error(`
        ${error.message}: ${error?.stack}\n\n 
        Inner Error: \n${error?.innerError}\n\n
        Inner Error Stack: ${error?.innerError?.stack}`)
      } else {
        Logger.console.error(`
        ${error?.message}: ${error?.stack}\n\n`)
      }
    })
  }

  public static info(...args: any[]): void {
    AttemptLog(() => Logger.console.info(Logger.formatArgs(args)))
  }

  public static verbose(...args: any[]): void {
    AttemptLog(() => Logger.console.verbose(Logger.formatArgs(args)))
  }

  private static formatArgs(args: any[]): string {
    // eslint-disable-next-line prefer-destructuring
    if (args.length <= 1) args = args[0]
    return JSON.stringify(args, null, 4)
  }
}

function GetTransportsBasedOnEnv() {
  if (shouldLogOnFile) {
    return [
      new logger.transports.File({ filename: `logs/${fileName}`, level: 'debug' }),
      new logger.transports.Console(),
    ]
  }
  return [new logger.transports.Console()]
}

function AttemptLog(callback: () => void) : void {
  if (shouldLog) {
    callback()
  }
}
