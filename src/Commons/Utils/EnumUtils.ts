/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export default class EnumUtils {
  public static GetEnumKeys<T>(myEnum : T) {
    const output : Array<keyof T> = []

    for (const enumMember in myEnum) {
      const isStringProperty = Number.isNaN(Number(enumMember))

      if (isStringProperty) {
        output.push(enumMember)
      }
    }

    return output
  }
}
