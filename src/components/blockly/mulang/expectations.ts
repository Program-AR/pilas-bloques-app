import * as Blockly from 'blockly/core'
import {
  allProcedureNames,
  allBlocksNestingControlStructures,
  entryPointType,
} from './blockUtils'

export const allProceduresShould =
  (...expectations: Array<(declaration: string) => string>) =>
  (workspace: Blockly.Workspace) =>
    allProcedureNames(workspace)
      .map(name => multiExpect(...expectations)(name))
      .join('\n')

const usesControlStructureEDL =
  'something that (uses if || uses while || uses repeat)'

const nestedControlStructureEDL = (loop: string) =>
  `! uses ${loop} with (anything, ${usesControlStructureEDL})`

const nestedAlternativeStructureEDL =
  `! uses if with (anything, ${usesControlStructureEDL}, anything) && ! uses if with (anything, anything, ${usesControlStructureEDL})`

export const declarationDoesNotNestControlStructures = (declaration: string) =>
  newExpectation(
    { isSuggestion: true, isForControlGroup: true, isScoreable: true },
    `within \`${declaration}\` ${nestedAlternativeStructureEDL} && ${nestedControlStructureEDL('repeat')} && ${nestedControlStructureEDL('while')}`,
    doesNotNestControlStructuresId,
    { declaration }
  )

export const doesNotNestControlStructures = (workspace: Blockly.Workspace) =>
  allBlocksNestingControlStructures(workspace)
    .map(declarationDoesNotNestControlStructures)
    .join('\n')


const toEDLString = (name: string) => `\`${name}\``

const join = (expectations: string[]) => expectations.join('\n')

const pass = `calls || ! calls`
const fail = `calls && ! calls`

export const doesNotUseRecursionId = 'does_not_use_recursion'
export const isUsedId = 'is_used'
export const isUsedFromMainId = 'is_used_from_main'
export const doSomethingId = 'do_something'
export const tooLongId = 'too_long'
export const nameWasChangedId = 'name_was_changed'
export const doesNotNestControlStructuresId = 'does_not_nest_control_structures'
export const mainTooLongId = 'main_too_long'

export const stringify = (id: string, opts: Record<string, any>) =>
  `${id}|${Object.entries(opts)
    .map(([key, value]) => `${key}=${value}`)
    .join(';')}`

export const newExpectation = (
  types: Record<string, any>,
  expect: string,
  id: string,
  opts: Record<string, any> = {}
) => {
  return `expectation "${btoa(stringify(id, { ...types, ...opts }))}": ${expect};`
}

const newSimpleCondition = (
  types: Record<string, any>,
  condition: boolean,
  id: string,
  opts: Record<string, any> = {}
) =>
  newExpectation(types, condition ? pass : fail, id, opts)

export const multiExpect = (...expectations: Array<(element: any) => string>) =>
  (element: any) =>
    join(expectations.map(expectation => expectation(element)))

export const countCallsWithin = (declaration: string) =>
  `within ${toEDLString(declaration)} count(calls) + count(calls ${toEDLString(declaration)})`

export const doSomething = (declaration: string) =>
  newExpectation(
    { isSuggestion: true, isForControlGroup: true, isScoreable: true },
    `${countCallsWithin(declaration)} >= 1`,
    doSomethingId,
    { declaration }
  )

export const isUsed = (declaration: string) =>
  newExpectation(
    { isSuggestion: true, isRelatedToUsage: true },
    `calls ${toEDLString(declaration)}`,
    isUsedId,
    { declaration }
  )

export const isUsedFromMain = (declaration: string) =>
  newExpectation(
    { isSuggestion: true, isRelatedToUsage: true },
    `through ${toEDLString(entryPointType)} calls ${toEDLString(declaration)}`,
    isUsedFromMainId,
    { declaration }
  )

const declarationNotTooLong = (
  limit: number,
  declaration: string,
  expectationName: string
) =>
  newExpectation(
    { isSuggestion: true, isForControlGroup: true, isScoreable: true },
    `${countCallsWithin(declaration)} <= ${limit - 1}`,
    expectationName,
    { declaration, limit }
  )

export const notTooLong = (limit = 7) => (declaration: string) =>
  declarationNotTooLong(limit, declaration, tooLongId)

export const mainNotTooLong = (limit = 7) =>
  declarationNotTooLong(limit, entryPointType, mainTooLongId)

export const doesNotUseRecursion = (declaration: string) =>
  newExpectation(
    { isCritical: true, isSuggestion: true },
    `not (through ${toEDLString(declaration)} calls ${toEDLString(declaration)})`,
    doesNotUseRecursionId,
    { declaration }
  )

export const nameWasChanged = (defaultProcedureName: string) =>
  (declaration: string) =>
    newSimpleCondition(
      { isSuggestion: true, isScoreable: true, isForControlGroup: true },
      !declaration.includes(defaultProcedureName),
      nameWasChangedId,
      { declaration }
    )

export const noExpectation = () => ''

export const parseExpect = (name: string) => {
  const expectationName = name.split('|')[0]

  const stringToBool = (value: string) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  }

  const paramsPart = name.split('|')[1] || ''

  const expectationParams = Object.fromEntries(
    paramsPart
      .split(';')
      .filter(Boolean)
      .map(entry => entry.split('='))
      .map(([paramName, paramValue]) => [paramName, stringToBool(paramValue)])
  )

  return [expectationName, expectationParams] as const
}