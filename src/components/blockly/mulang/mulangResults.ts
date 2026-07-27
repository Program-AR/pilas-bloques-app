import { parseExpect } from './expectations'

export type MulangRawResult = [string, boolean]

export type MulangExpectationResult = {
  id: string
  result: boolean
  declaration?: string
  isCritical?: boolean
  isSuggestion?: boolean
  isScoreable?: boolean
  isRelatedToUsage?: boolean
  [key: string]: any
}

export const isUsedId = 'is_used'
export const isUsedFromMainId = 'is_used_from_main'

const isUsageResult = (result: MulangExpectationResult) =>
  result.isRelatedToUsage

const combineUsageGroup = (
  group: MulangExpectationResult[]
): MulangExpectationResult => {
  const isUsed = group.find(result => result.id === isUsedId)
  const isUsedFromMain = group.find(result => result.id === isUsedFromMainId)

  if (!isUsed) return group[0]

  // Si no está usado en ningún lado, mostramos sólo is_used.
  if (!isUsed.result) return isUsed

  // Si está usado, pero no desde main, mostramos is_used_from_main.
  if (isUsedFromMain && !isUsedFromMain.result) return isUsedFromMain

  // Si ambos pasan, devolvemos is_used_from_main o is_used como resultado positivo.
  return isUsedFromMain || isUsed
}

export const combineUsageResults = (
  results: MulangExpectationResult[]
): MulangExpectationResult[] => {
  const usageResults = results.filter(isUsageResult)
  const otherResults = results.filter(result => !isUsageResult(result))

  const groupedByDeclaration = usageResults.reduce<Record<string, MulangExpectationResult[]>>(
    (acc, result) => {
      const key = result.declaration || '__global__'
      acc[key] = acc[key] || []
      acc[key].push(result)
      return acc
    },
    {}
  )

  const combinedUsageResults = Object
    .values(groupedByDeclaration)
    .map(combineUsageGroup)

  return [
    ...otherResults,
    ...combinedUsageResults,
  ]
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