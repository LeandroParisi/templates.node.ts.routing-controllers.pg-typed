export type KeysValuesOf<T> = { [P in keyof Required<T>]: keyof Required<T> };

export type KeysOf<T> = { [P in keyof Required<T>]: any };

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};
