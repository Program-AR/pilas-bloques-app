import { TFunction } from 'i18next'
import { MulangExpectationResult } from './mulangResults'

export const messageForExpectation = (
  result: MulangExpectationResult,
  t: TFunction
) => {
  return t(`mulang:suggestions.${result.id}`, {
    defaultValue: t('mulang:suggestions.check_out_this_block'),
  })
}