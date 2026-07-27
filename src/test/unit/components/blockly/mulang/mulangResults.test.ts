import { combineUsageResults, isUsedId, isUsedFromMainId, MulangExpectationResult } from '../../../../../components/blockly/mulang/mulangResults'

describe('Mulang Results - combineUsage', () => {

  const isUsedDescription = 'IS USED DESC'
  const isUsedFromMainDescription = 'IS USED FROM MAIN DESC'

  const createResult = (id: string, result: boolean, description: string, declaration?: string, isRelatedToUsage = true): MulangExpectationResult => ({
    id, result, description, declaration, isRelatedToUsage
  })

  it('Combine two usage results of a procedure that is not used from anywhere', () => {
    const isUsedResult = createResult(isUsedId, false, isUsedDescription)
    const isUsedFromMainResult = createResult(isUsedFromMainId, false, isUsedFromMainDescription)

    expect(combineUsageResults([isUsedResult, isUsedFromMainResult])).toEqual([
      createResult(isUsedId, false, isUsedDescription)
    ])
  })

  it('Combine two usage results of a procedure that is used from another procedure but not from main', () => {
    const isUsedResult = createResult(isUsedId, true, isUsedDescription)
    const isUsedFromMainResult = createResult(isUsedFromMainId, false, isUsedFromMainDescription)

    expect(combineUsageResults([isUsedResult, isUsedFromMainResult])).toEqual([
      createResult(isUsedFromMainId, false, isUsedFromMainDescription)
    ])
  })

  it('Combine two usage results of a procedure that is used', () => {
    const isUsedResult = createResult(isUsedId, true, isUsedDescription)
    const isUsedFromMainResult = createResult(isUsedFromMainId, true, isUsedFromMainDescription)

    expect(combineUsageResults([isUsedResult, isUsedFromMainResult])).toEqual([
      createResult(isUsedFromMainId, true, isUsedFromMainDescription)
    ])
  })

  it('Combine usage results multiple', () => {
    const flyProcedure = 'fly'
    const jumpProcedure = 'jump'
    const ifResult = createResult('if', false, '', 'conditional', false)
    const whileResult = createResult('while', true, '', 'loop', false)
    const flyIsUsed = createResult(isUsedId, true, isUsedDescription, flyProcedure)
    const flyIsUsedFromMain = createResult(isUsedFromMainId, false, isUsedFromMainDescription, flyProcedure)
    const jumpIsUsed = createResult(isUsedId, true, isUsedDescription, jumpProcedure)
    const jumpIsUsedFromMain = createResult(isUsedFromMainId, true, isUsedFromMainDescription, jumpProcedure)
    
    // According to the original tests, combined results are grouped
    const flyIsUsedCombined = createResult(isUsedFromMainId, false, isUsedFromMainDescription, flyProcedure)
    const jumpIsUsedCombined = createResult(isUsedFromMainId, true, isUsedFromMainDescription, jumpProcedure)

    const result = combineUsageResults([ifResult, flyIsUsed, flyIsUsedFromMain, whileResult, jumpIsUsed, jumpIsUsedFromMain])
    
    expect(result).toEqual(expect.arrayContaining([
      ifResult, 
      whileResult, 
      flyIsUsedCombined, 
      jumpIsUsedCombined
    ]))
    expect(result).toHaveLength(4)
  })

})
