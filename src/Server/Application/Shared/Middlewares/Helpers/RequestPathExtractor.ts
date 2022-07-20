/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request } from 'express'
import ParsingError from '../../Errors/SpecificErrors/ParsingError'

export default class RequestPathExtractor {
  public static GetInfoFromPath<T>(request : Request, infoPath : string) : T {
    try {
      const { paths, pathDepth } = this.ParsePath(infoPath)

      let output = request as unknown as any

      for (let i = 0; i <= pathDepth; i += 1) {
        output = output[paths[i]]
      }

      if (output === undefined) {
        throw new ParsingError(`Given info path ${infoPath} is deeper than request path`)
      }

      return output as T
    } catch (error) {
      if (error instanceof ParsingError) {
        throw error
      } else {
        throw new ParsingError(
          `Unable to parse info from request at RequestPathExtractor: \nRequest:\n${request}\nPath:${infoPath}`,
          error,
        )
      }
    }
  }

  private static ParsePath(infoPath: string) : { pathDepth: number, paths : string[] } {
    const paths = infoPath.split('.')
    const pathDepth = paths.length - 1

    return {
      paths,
      pathDepth,
    }
  }
}
