export default class TypeUtils {
  public static IsArray(t : any) {
    return Array.isArray(t)
  }

  public static IsDate(t : any) {
    return t instanceof Date
  }

  public static IsObject(o : any) {
    return o === Object(o) && !TypeUtils.IsArray(o) && typeof o !== 'function'
  }
}
