import * as Blockly from 'blockly/core'
import { getPathToChallenge } from '../../../staticData/challenges'
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
  usesSimpleRepetition,
  usesConditionalAlternative,
  usesConditionalRepetition,
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

  conditionalAlternative: () => usesConditionalAlternative(),

  conditionalRepetition: () => usesConditionalRepetition(),

  simpleRepetition: () => usesSimpleRepetition(),

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

const mergeConfigurations = (expectationsConfigs: Array<Record<string, boolean> | undefined>) =>
  expectationsConfigs
    .filter(Boolean)
    .reduce((baseExpect, expectWithPriority) => ({
      ...baseExpect,
      ...expectWithPriority,
    }), {} as Record<string, boolean>)

const configToExpectation = (
  expectationsConfig: Record<string, boolean> | undefined,
  workspace: Blockly.WorkspaceSvg,
  defaultProcedureName: string
) => {
  if (!expectationsConfig || !Object.keys(expectationsConfig).length) return noExpectation()

  const expectationFns = Object.entries(expectationsConfig)
    .filter(([, shouldApply]) => shouldApply)
    .map(([id]) => idsToExpectations(defaultProcedureName)[id as keyof ReturnType<typeof idsToExpectations>])
    .filter((expectation): expectation is (element: any) => string => Boolean(expectation))

  if (!expectationFns.length) return noExpectation()

  return multiExpect(...expectationFns)(workspace)
}

const allExpectConfigurations = (challenge: any) => {
  if (!challenge?.id) return []

  const { book, chapter, group, challenge: pathChallenge } = getPathToChallenge(challenge.id)
  return [book as any, chapter as any, group as any, pathChallenge].map(model => model?.expectations)
}

const allExpectConfigurationsMerged = (challenge: any) =>
  mergeConfigurations(allExpectConfigurations(challenge))

export const expectationFor = (
  challenge: any,
  workspace: Blockly.WorkspaceSvg,
  defaultProcedureName = 'Hacer algo'
) => {
  const expectationsConfig = allExpectConfigurationsMerged(challenge)
  return configToExpectation(expectationsConfig, workspace, defaultProcedureName)
}