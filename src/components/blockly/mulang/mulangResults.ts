import { parseExpect } from './expectations'

export type MulangRawResult = [string, boolean]

export type MulangExpectationResult = {
  id: string
  result: boolean
  declaration?: string
  isCritical?: boolean
  isSuggestion?: boolean
  isScoreable?: boolean
  isForControlGroup?: boolean
  isRelatedToUsage?: boolean
  [key: string]: any
}

export const toExpectationResult = (
  [encodedExpect, result]: MulangRawResult
): MulangExpectationResult => {
  const decoded = atob(encodedExpect)
  const [id, params] = parseExpect(decoded)

  return {
    id,
    result,
    ...params,
  }
}

export const parseMulangResults = (results: MulangRawResult[]) =>
  results.map(toExpectationResult)