export default class ArrayUtils {
  public static GetRandomElement<T>(array : T[]) {
    const random = Math.floor(Math.random() * array.length)

    return array[random]
  }
}
