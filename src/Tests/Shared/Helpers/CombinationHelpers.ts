/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export default class CombinationHelpers {
  public static GetAllSimpleCombinationsOf<T>(input : T[]) : Array<Array<T>> {
    const result : Array<Array<T>> = []
    for (let i = 0; i < input.length; i += 1) {
      for (let j = i + 1; j < input.length; j += 1) {
        result.push([input[i], input[j]])
      }
    }
    return result
  }

  public static GetAllUniqueCombinationsOf<T>(input: T[]) : Array<Array<T>> {
    let result : any = new Set([...input])

    for (let i = 1; i < input.length; i += 1) {
      const newResult = CombinationHelpers.GetPossibleCombinations(result, input)
      result = new Set([...newResult])
    }

    return [...result as Array<Array<T>>]
  }

  private static GetPossibleCombinations<T>(currentBaseCombinationsSet : Set<T[]>, originalInput : T[]) : Array<Array<T>> {
    const result : Array<Array<T>> = []
    const currentBaseCombinations = [...currentBaseCombinationsSet]

    for (let i = 0; i < currentBaseCombinationsSet.size; i += 1) {
      for (let j = 0; j < originalInput.length; j += 1) {
        const newItem = [].concat.apply([], [currentBaseCombinations[i], originalInput[j]])
          .filter((current, index, self) => self.indexOf(current) === index)
          .sort() as T[]

        if (currentBaseCombinationsSet.has(newItem)) {

        } else {
          result.push(newItem)
        }
      }
    }
    return result
  }
}
