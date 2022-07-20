export default class StringParser {
  public static ToCamelCase(str : string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
        index === 0 ? word.toLowerCase()
          : word.toUpperCase())).replace(/\s+/g, '')
  }

  public static Normalize(str : string) : string {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '')
  }
}
