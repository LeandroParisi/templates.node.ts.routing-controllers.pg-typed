# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Properlly create .env file
3. Run `npm start` command
___


## Architecture

1. Application:
   1. Contexts: Organized WebApi Controllers by application domain / context
      1. Controllers: requests, validations -> Validations stay on this layer
      2. UseCases: DTOs (without validations) and specific logic of a controller if neccesary
2. Commons: Parsers, Mappers, Anotations, Generic Interfaces, etc.
3. Configuration: configs
4. Domain: Entities, enums, etc.
5. Infrastructure: DbConnection, repositories

