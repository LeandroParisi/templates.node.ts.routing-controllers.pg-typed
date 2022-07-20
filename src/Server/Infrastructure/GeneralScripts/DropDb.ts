/* eslint-disable no-new */
import CONSTANTS from '../../../Commons/Configuration/constants'
import DbReset from './Classes/DbReset'

new DbReset(CONSTANTS.DATABASE_NAME, CONSTANTS.LOCAL_POSTGRESS_URL)
  .DropDatabase()
  .then((r) => console.log('\nSucessfully dropped DB\n'))
  .catch((r) => console.log(`\nError dropping DB\n${r}`))
