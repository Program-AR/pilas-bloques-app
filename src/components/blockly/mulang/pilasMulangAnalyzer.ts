import * as Blockly from 'blockly/core'
import { parseAll } from './pilasMulang'
import { expectationFor } from './challengeExpectations'

export const analyzeWithMulang = (
  workspace: Blockly.WorkspaceSvg,
  challenge: any
) => {
  const ast = parseAll(workspace)
  const customExpect = expectationFor(challenge, workspace)

  console.log('MULANG AST FULL', JSON.stringify(ast, null, 2))
  console.log('MULANG CUSTOM EXPECT', customExpect)

  try {
    const astCode = (window as any).mulang.astCode(ast)

    console.log(
      'MULANG CODE CONTENT',
      JSON.stringify(astCode.content, null, 2)
    )

    console.log('MULANG AST CODE OK', astCode)

    if (!customExpect.trim()) return []

    const results = astCode.customExpect(customExpect)

    console.log('MULANG RESULTS', results)

    return results
  } catch (e) {
    console.error('MULANG ANALYZE ERROR', e)
    return []
  }
}
