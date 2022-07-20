// import { faker } from '@faker-js/faker'
// import DateUtils from '../../../Commons/Utils/DateUtils'
// import Bot from '../../../Server/Domain/Entities/Bot'
// import StepMock from './StepMock'

// type MockOptionals = Partial<Bot>

// export default class BotMock {
//   public static GetRandom(optionals? : MockOptionals) : Bot {
//     const bot : Bot = {
//       id: optionals?.id || null,
//       botName: optionals?.botName || faker.name.firstName(),
//       isActive: optionals?.isActive || faker.datatype.boolean(),
//       createdAt: optionals?.createdAt || DateUtils.DateNow(),
//       updatedAt: optionals?.updatedAt || DateUtils.DateNow(),
//       userId: optionals?.userId || faker.datatype.number(10000),
//       steps: optionals?.steps || [
//         StepMock.GetRandomSimpleStep(),
//         StepMock.GetRandomOptionsStep(),
//       ],
//     }

//     return bot
//   }
// }
