export default interface IDictionary<V> {
  [Key: string]: V;
}

export type Dictionary<K, V> = { [P in keyof Required<K>]: V };
