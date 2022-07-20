import StaticImplements from '../../../Commons/Anotations/StaticImplements'

@StaticImplements()
export default class IntegratedTestsConfig {
  static TEST_DATABASE_NAME = 'whatzup_tests'

  static LOCAL_POSTGRESS_URL = 'postgres://leandro_parisi:123deolivera4@localhost:5432'

  static TEST_DATABASE_URL = `${IntegratedTestsConfig.LOCAL_POSTGRESS_URL}/${IntegratedTestsConfig.TEST_DATABASE_NAME}`
}
