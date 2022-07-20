// import { faker } from '@faker-js/faker'
// import chai, { assert } from 'chai'
// import chaiSubset from 'chai-subset'
// import { UserRepository } from '../../../../../../Server/Infrastructure/PgTyped/Repositories/UserRepository'
// import UserMock from '../../../../../Shared/Mocks/UserMock'
// import DbSetup from '../../../../Setup/Fixtures/DbSetup/DbSetup'
// import { TestDbConnection } from '../../../../Setup/Fixtures/DbSetup/TestDbConnection'

// chai.use(chaiSubset)
// describe('Base repository tests', () => {
//   let dbSetup : DbSetup

//   beforeEach(() => {
//     dbSetup = new DbSetup()
//   })

//   afterEach(async () => {
//     await dbSetup.CleanUp()
//   })

//   it('1. Should properlly find entity if it exists', async () => {
//     // Arrange
//     const { user } = await dbSetup.BasicUserSetup()

//     // Act
//     const foundUser = await new UserRepository(TestDbConnection.tables.users).FindOne({ id: user.id }, TestDbConnection.db)

//     // Assert
//     assert.isNotNull(foundUser)
//     assert.deepEqual(user, foundUser)
//   })

//   it('2. Should not find entity if it does not exist', async () => {
//     // Arrange
//     await dbSetup.BasicUserSetup()

//     // Act
//     const foundUser = await new UserRepository(TestDbConnection.tables.users)
//       .FindOne({ id: faker.datatype.number({ min: 1000000, max: 2000000 }) }, TestDbConnection.db)

//     // Assert
//     assert.isNull(foundUser)
//   })

//   it('3. Should create entity properlly', async () => {
//     // Arrange
//     const { state, city, country } = await dbSetup.BasicLocationsSetup()
//     const phoneNumber = await dbSetup.phoneNumberSetup.InsertOne()
//     const user = UserMock.GetRandomPartialUser(country.id, state.id, city.id, phoneNumber.id)

//     // Act
//     const insertedUser = await new UserRepository(TestDbConnection.tables.users)
//       .Create(user, TestDbConnection.db)
//     dbSetup.userSetup.EntitiesToDispose.push(insertedUser)

//     // Assert
//     const foundUser = await dbSetup.userSetup.FindOne({ id: insertedUser.id })

//     assert.isNotNull(foundUser)
//     assert.deepEqual(insertedUser, foundUser)
//   })

//   it('4. Should update entity property', async () => {
//     // Arrange
//     const {
//       user,
//     } = await dbSetup.BasicUserSetup()
//     const updateStatement = { addressStreet: 'UNIT TESTS UPDATE' }

//     // Act
//     const isUpdated = await new UserRepository(TestDbConnection.tables.users)
//       .UpdateOne({ id: user.id }, updateStatement, TestDbConnection.db)

//     // Assert
//     const foundUser = await dbSetup.userSetup.FindOne({ id: user.id })

//     assert.isTrue(isUpdated)
//     assert.equal(
//       JSON.stringify({ ...foundUser }),
//       JSON.stringify({ ...user, ...updateStatement }),
//     )
//   })
// })
