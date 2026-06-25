import * as Blockly from 'blockly/core'
import { parseAll } from './pilasMulang'
import { expectationFor } from './challengeExpectations'
import { combineUsageResults, parseMulangResults } from './mulangResults'

export const analyzeWithMulang = (
  workspace: Blockly.WorkspaceSvg,
  challenge: any
) => {
  const ast = parseAll(workspace)
  const customExpect = expectationFor(challenge, workspace)

  try {
    const astCode = (window as any).mulang.astCode(ast)

    if (!customExpect.trim()) return []

    const results = astCode.customExpect(customExpect)
    const parsedResults = combineUsageResults(parseMulangResults(results))

    return parsedResults
    
  } catch (e) {
    console.error('MULANG ANALYZE ERROR', e)
    return []
  }
}
