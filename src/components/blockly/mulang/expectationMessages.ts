import { TFunction } from 'i18next'
import { MulangExpectationResult } from './mulangResults'

export const messageForExpectation = (
  result: MulangExpectationResult,
  t: TFunction
) => {
  return t(`suggestions.${result.id}`, {
    ns: 'mulang',
    defaultValue: t('suggestions.check_out_this_block', { ns: 'mulang' }),
  })
}