export default class EntityCleaning {
  public static CleanEntity<Entity>(model: Partial<Entity>) : Partial<Entity> {
    const entity = { ...model }

    Object.entries(entity).forEach(([key, value]) => {
      if (!value && value !== 0) {
        delete entity[key]
      }
    })

    return entity
  }

  static CleanSpecificFields<Entity>(model: Entity, fieldsToRemove: Set<string>) : Partial<Entity> {
    const entity = { ...model }

    Object.entries(entity).forEach(([key, value]) => {
      if (fieldsToRemove.has(key) && !value && value !== 0) {
        delete entity[key]
      }
    })

    return entity
  }

  public static RemoveNullableValues<Entity>(model: Partial<Entity>) : void {
    const nonNullableValues = this.CleanEntity(model)

    Object.keys(model).forEach((key) => {
      if (nonNullableValues[key]) {
        // Nothing to do, since we want to maintain that value on the source object
      } else {
        // eslint-disable-next-line no-param-reassign
        delete model[key]
      }
    })
  }
}
