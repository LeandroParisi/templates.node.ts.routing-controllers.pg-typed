/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import express from 'express'
import { OpenAPIObject } from 'openapi3-ts'
import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import * as swaggerUiExpress from 'swagger-ui-express'
import CONSTANTS from '../../Commons/Configuration/constants'

const { defaultMetadataStorage } = require('class-transformer/cjs/storage')

export default class GenerateApiDocumentation {
  static Generate(app : express.Express, options? : RoutingControllersOptions) {
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    })

    const storage = getMetadataArgsStorage()

    const spec = routingControllersToSpec(storage, options, {
      components: {
        schemas,
      },
      info: {
        description: 'Generated with `routing-controllers-openapi`',
        title: 'A sample API',
        version: '1.0.0',
      },
    })

    const swaggerOpts : swaggerUiExpress.SwaggerUiOptions = {
      swaggerOptions: {
        basicAuth: {
          name: 'Authorization',
          schema: {
            type: 'basic',
            in: 'header',
          },
          value: '<JWT>',
        },
      },
    }

    const newSpec = this.ParseSpec(spec)

    app.use('/swagger', swaggerUiExpress.serve, swaggerUiExpress.setup(newSpec, swaggerOpts))

    app.get('/swagger/docs', (_req, res) => {
      res.json(newSpec)
    })
  }

  private static ParseSpec(spec: OpenAPIObject) : OpenAPIObject {
    const ignorePattern = new RegExp(CONSTANTS.ROUTE_IGNORE_PATTERN)
    const pathsToKeep = Object.keys(spec.paths).filter((path) => !ignorePattern.test(path))

    const newPaths = {}

    pathsToKeep.forEach((path) => {
      newPaths[path] = spec.paths[path]
    })

    return {
      ...spec,
      paths: newPaths,
    }
  }
}
