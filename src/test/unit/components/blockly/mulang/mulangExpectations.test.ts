import mulang from 'mulang'
import { entryPointType } from '../../../../../components/blockly/mulang/blockUtils'
import { 
  doSomething, 
  isUsed, 
  isUsedFromMain, 
  notTooLong, 
  parseExpect, 
  doesNotUseRecursion, 
  stringify, 
  isCritical, 
  doesNotUseRecursionId, 
  newExpectation, 
  countCallsWithin, 
  nameWasChanged, 
  usesConditionalAlternative, 
  usesConditionalRepetition, 
  usesSimpleRepetition, 
  declarationDoesNotNestControlStructures 
} from '../../../../../components/blockly/mulang/expectations'
import { procedure, entryPoint, rawSequence, application, muIf, ifElse, none, muUntil, repeat, number } from './astFactories'

describe('Mulang Expectations', () => {

  const declaration = 'PROCEDURE'
  const limit = 3

  // EDL
  expectationTestOk('doSomething', doSomething(declaration), [
    procedure(declaration, [],
      application('PRIMITIVE')
    )
  ])

  expectationTestOk('doSomething', doSomething(declaration), [
    procedure(declaration, [],
      application(declaration)
    )
  ], 'Recursion should count as doing something')

  expectationTestFail('doSomething', doSomething('EMPTY'), [
    procedure('EMPTY', [])
  ])

  expectationTestOk('isUsed', isUsed('EMPTY'), [
    entryPoint(entryPointType,
      application('EMPTY')
    ),
    procedure('EMPTY', [])
  ])

  expectationTestOk('isUsed (from procedure)', isUsed('EMPTY'), [
    procedure(declaration, [],
      application('EMPTY')
    ),
    procedure('EMPTY', [])
  ])

  expectationTestFail('isUsed', isUsed('EMPTY'), [
    entryPoint(entryPointType),
    procedure('EMPTY', [])
  ])

  expectationTestOk('isUsedFromMain', isUsedFromMain('EMPTY'), [
    entryPoint(entryPointType,
      application('EMPTY')
    ),
    procedure('EMPTY', [])
  ])

  expectationTestFail('isUsedFromMain', isUsedFromMain('EMPTY'), [
    entryPoint(entryPointType),
    procedure('EMPTY', []),
    procedure(declaration, [],
      application('EMPTY')
    )
  ])

  expectationTestOk('notTooLong', notTooLong(limit)(entryPointType), [
    entryPoint(entryPointType,
      application('PRIMITIVE'),
      application('PRIMITIVE'),
    ),
  ])

  expectationTestFail('notTooLong', notTooLong(limit)(entryPointType), [
    entryPoint(entryPointType,
      application('PRIMITIVE'),
      application('PRIMITIVE'),
      application('PRIMITIVE'),
    )
  ])

  expectationTestFail('notTooLong', notTooLong(limit)(declaration), [
    procedure(declaration, [],
      application(declaration),
      application(declaration),
      application(declaration)
    )
  ], 'Recursive calls should count as being too long')
  
  expectationTestFail('declarationDoesNotNestControlStructures', declarationDoesNotNestControlStructures(entryPointType), [
    entryPoint(entryPointType,
      muIf(none(),
        muUntil(none(), none())
      )
    )
  ])

  expectationTestFail('declarationDoesNotNestControlStructures', declarationDoesNotNestControlStructures(entryPointType), [
    entryPoint(entryPointType,
      muUntil(none(),
        muIf(none(), none())
      )
    )
  ])

  expectationTestFail('declarationDoesNotNestControlStructures', declarationDoesNotNestControlStructures(entryPointType), [
    entryPoint(entryPointType,
      repeat(number(3),
        muIf(none(), none())
      )
    )
  ])

  expectationTestFail('declarationDoesNotNestControlStructures', declarationDoesNotNestControlStructures(declaration), [
    procedure(declaration, [], 
      muIf(none(),
        repeat(number(3), none()))  
    )
  ])

  expectationTestFail('declarationDoesNotNestControlStructures', declarationDoesNotNestControlStructures(declaration), [
    procedure(declaration, [], 
      muIf(none(),
        muIf(none())) 
    )
  ])

  expectationTestFail('declarationDoesNotNestControlStructures', declarationDoesNotNestControlStructures(declaration), [
    procedure(declaration, [], 
      muIf(none(),
        muUntil(none(), none())) 
    )
  ])

  expectationTestOk('declarationDoesNotNestControlStructures', declarationDoesNotNestControlStructures(declaration), [
    procedure(declaration, [],
      muIf(none(),
      application("PROCEDURE2"))
    ),
    procedure("PROCEDURE2", [],
      muIf(none())
    )
  ])

  expectationTestOk('doesNotUseRecursion', doesNotUseRecursion(declaration), [
    procedure(declaration, [],
      application("PROCEDURE2")
    ),
    procedure("PROCEDURE2", [])
  ])

  expectationTestFail('usesConditionalAlternative', usesConditionalAlternative(), [
    entryPoint(entryPointType,
      application('EMPTY')
    )
  ])

  expectationTestOk('usesSimpleConditionalAlternative', usesConditionalAlternative(), [
    entryPoint(entryPointType,
      muIf(none())
    )
  ])

  expectationTestOk('usesCompleteConditionalAlternative', usesConditionalAlternative(), [
    entryPoint(entryPointType,
      ifElse(none(), none(), none())
    )
  ])

  expectationTestOk('Global expectation is transitive through a procedure', usesConditionalAlternative(), [
    entryPoint(entryPointType,
      application('USES_IF')
    ),
    procedure('USES_IF', [],
      muIf(none())
    )
  ])

  expectationTestFail('usesCondicionalRepetition', usesConditionalRepetition(), [
    entryPoint(entryPointType,
      application('EMPTY')
    )
  ])

  expectationTestOk('usesCondicionalRepetition', usesConditionalRepetition(), [
    entryPoint(entryPointType,
      muUntil(none(), none())
    )
  ])

  // Direct recursion
  expectationTestFail('doesNotUseRecursion', doesNotUseRecursion(declaration), [
    procedure(declaration, [],
      application(declaration)
    )
  ])

  expectationTestFail('usesSimpleRepetition', usesSimpleRepetition(), [
    entryPoint(entryPointType,
      application('EMPTY')
    )
  ])

  expectationTestOk('usesSimpleRepetition', usesSimpleRepetition(), [
    entryPoint(entryPointType,
      repeat(number(3), none())
    )
  ])

  // Indirect recursion
  expectationTestFail('doesNotUseRecursion', doesNotUseRecursion(declaration), [
    procedure(declaration, [],
      application("PROCEDURE2")
    ),
    procedure("PROCEDURE2", [],
      application(declaration)
    )
  ], 'Indirect recursion should count as recursion')

  expectationTestFail('doesNotUseRecursion', doesNotUseRecursion(declaration), [
    procedure(declaration, [],
      application(declaration),
      application("PROCEDURE2")
    ),
    procedure("PROCEDURE2", [],
      application('PRIMITIVE'))
  ], 'Direct recursion with another procedure call should count as recursion')

  expectationTestOk('countCallsWithin', newExpectation(`${countCallsWithin(declaration)} = 2`, 'counts', { declaration }), [
    procedure(declaration, [],
      application("PROCEDURE2"),
      application(declaration)
    ),
    procedure("PROCEDURE2", [])
  ], 'countCallsWithin includes recursive calls')

  function expectationTestOk(expectationName: string, expectation: string, astNodes: any[], testName = '') {
    expectationTest(expectationName, expectation, astNodes, true, testName)
  }

  function expectationTestFail(expectationName: string, expectation: string, astNodes: any[], testName = '') {
    expectationTest(expectationName, expectation, astNodes, false, testName)
  }

  function expectationTest(expectationName: string, edl: string, astNodes: any[], shouldPass: boolean, testName = '') {
    let workspaceMock: Blockly.WorkspaceSvg

    beforeEach(() => {
      workspaceMock = { 
        getTopBlocks: jest.fn(),
        getAllBlocks: jest.fn().mockReturnValue([])
      } as any as Blockly.WorkspaceSvg
    })
    it(`Expectation ${expectationName} - ${testName || (shouldPass ? 'ok' : 'fail')}`, () => {
      const results: any[] = (mulang as any)
        .astCode(rawSequence(astNodes))
        .customExpect(edl)
      
      const mulangResult = results.every(([, result]) => result)

      if (shouldPass) {
        expect(mulangResult).toBe(true)
      } else {
        expect(mulangResult).toBe(false)
      }
    })
  }

  // IDs tests
  expectationKeyTest('doSomething', doSomething(declaration),
    ['do_something', { declaration, isSuggestion: true, isScoreable: true }]
  )

  expectationKeyTest('isUsed', isUsed(declaration),
    ['is_used', { declaration, isSuggestion: true, isRelatedToUsage: true }]
  )

  expectationKeyTest('isUsedFromMain', isUsedFromMain(declaration),
    ['is_used_from_main', { declaration, isSuggestion: true, isRelatedToUsage: true }]
  )

  expectationKeyTest('notTooLong', notTooLong(limit)(declaration),
    ['too_long', { declaration, limit: String(limit), isSuggestion: true, isScoreable: true }]
  )

  expectationKeyTest('declarationDoesNotNestControlStructures', declarationDoesNotNestControlStructures(declaration),
    ['does_not_nest_control_structures', { declaration, isSuggestion: true, isScoreable: true }]
  )

  expectationKeyTest('usesConditionalAlternative', usesConditionalAlternative(),
    ['uses_conditional_alternative', { declaration: entryPointType, isSuggestion: true, isScoreable: true }]
  )

  expectationKeyTest('usesConditionalRepetition', usesConditionalRepetition(),
    ['uses_conditional_repetition', { declaration: entryPointType, isSuggestion: true, isScoreable: true }]
  )

  expectationKeyTest('usesSimpleRepetition', usesSimpleRepetition(),
    ['uses_simple_repetition', { declaration: entryPointType, isSuggestion: true, isScoreable: true }]
  )

  expectationKeyTest('doesNotUseRecursion', doesNotUseRecursion(declaration),
    ['does_not_use_recursion', { declaration, isCritical: true, isSuggestion: true }]
  )

  function expectationKeyTest(expectationName: string, edl: string, ...expectedIds: any[]) {
    it(`ID for ${expectationName}`, () => {
      const fullId = (mulang as any)
        .astCode(rawSequence([]))
        .customExpect(edl)
        .map(([name]: any) => parseExpect(window.atob(name)))

      expect(fullId).toEqual(expectedIds)
    })
  }

  const expectationNameVar = 'expectation_id'
  const stringifiedExpectationId = 'expectation_id|'
  const stringifiedExpectationOneOpt = 'expectation_id|declaration=PROCEDURE'
  const stringifiedExpectationMultipleOpt = 'expectation_id|declaration=PROCEDURE;b=foo'

  // Utils
  it('stringify with expectation id only', () => {
    expect(stringify('expectation_id', {})).toBe(stringifiedExpectationId)
  })

  it('stringify with one option', () => {
    expect(stringify('expectation_id', { declaration })).toBe(stringifiedExpectationOneOpt)
  })

  it('stringify with multiple options', () => {
    expect(stringify('expectation_id', { declaration, b: 'foo' })).toBe(stringifiedExpectationMultipleOpt)
  })

  it('parseExpect with expectation name only', () => {
    expect(parseExpect(stringifiedExpectationId)).toEqual([expectationNameVar, { "": undefined }])
  })

  it('parseExpect with expectation name and one param', () => {
    expect(parseExpect(stringifiedExpectationOneOpt)).toEqual([expectationNameVar, { declaration: declaration }])
  })

  it('parseExpect with expectation name and multiple params', () => {
    expect(parseExpect(stringifiedExpectationMultipleOpt)).toEqual([expectationNameVar, { declaration: declaration, b: 'foo' }])
  })

  it('critical expectation is critical', () => {
    expect(isCritical({ id: doesNotUseRecursionId, isCritical: true, result: false })).toBe(true)
  })

  it('non critical expectation is not critical', () => {
    expect(isCritical({ id: 'is_used', result: false })).toBe(false)
  })

})
