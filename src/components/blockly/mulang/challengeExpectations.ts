import * as Blockly from 'blockly/core'
import {
  allProceduresShould,
  doesNotUseRecursion,
  doSomething,
  isUsed,
  isUsedFromMain,
  multiExpect,
  notTooLong,
  mainNotTooLong,
  noExpectation,
  nameWasChanged,
  doesNotNestControlStructures,
} from './expectations'

const idsToExpectations = (defaultProcedureName: string) => ({
  decomposition: multiExpect(
    () => mainNotTooLong(),
    doesNotNestControlStructures,
    allProceduresShould(
      notTooLong(),
      doSomething,
      isUsed,
      isUsedFromMain,
      doesNotUseRecursion,
      nameWasChanged(defaultProcedureName)
    )
  ),

  decomposition9: multiExpect(
    () => mainNotTooLong(9),
    doesNotNestControlStructures,
    allProceduresShould(
      notTooLong(9),
      doSomething,
      isUsed,
      isUsedFromMain,
      doesNotUseRecursion,
      nameWasChanged(defaultProcedureName)
    )
  ),
})

export const expectationFor = (
  challenge: any,
  workspace: Blockly.WorkspaceSvg,
  defaultProcedureName = 'procedimiento'
) => {
  const expectationsConfig = challenge?.expectations || {}

  const expectationFns = Object.entries(expectationsConfig)
    .filter(([, shouldApply]) => shouldApply)
    .map(([id]) => idsToExpectations(defaultProcedureName)[id as keyof ReturnType<typeof idsToExpectations>])
    .filter(Boolean)

  if (!expectationFns.length) return noExpectation()

  return multiExpect(...expectationFns)(workspace)
}