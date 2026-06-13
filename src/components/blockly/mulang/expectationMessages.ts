import { TFunction } from 'i18next'
import { MulangExpectationResult } from './mulangResults'

export const messageForExpectation = (
  result: MulangExpectationResult,
  t: TFunction
) => {
  return t(`mulang:suggestions.${result.id}`, {
    defaultValue: 'Revisá este bloque.',
  })
}