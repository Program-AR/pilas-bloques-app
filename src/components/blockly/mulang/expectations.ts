const entryPointType = 'al_empezar_a_ejecutar'

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