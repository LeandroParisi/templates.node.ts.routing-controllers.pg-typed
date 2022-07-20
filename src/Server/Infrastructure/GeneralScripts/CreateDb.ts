/* eslint-disable no-new */
import CONSTANTS from '../../../Commons/Configuration/constants'
import DbReset from './Classes/DbReset'

new DbReset(CONSTANTS.DATABASE_NAME, CONSTANTS.LOCAL_POSTGRESS_URL)
  .TryCreateDb()
  .then((r) => console.log('\nSucessfully created DB\n'))
  .catch((r) => console.log(`\nError creating DB\n${r}`))
