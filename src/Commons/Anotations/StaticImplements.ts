/* eslint-disable no-unused-expressions */
export default function StaticImplements<T>() {
  return <U extends T>(constructor: U) => { constructor }
}
