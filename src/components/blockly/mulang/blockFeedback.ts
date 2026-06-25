import * as Blockly from 'blockly/core'
import { MulangExpectationResult } from './mulangResults'
import { messageForExpectation } from './expectationMessages'
import { TFunction } from 'i18next'

const entryPointType = 'al_empezar_a_ejecutar'

const failedResults = (results: MulangExpectationResult[]) =>
  results.filter(result => result.result === false)

const showWarning = (block: any, message: string) => {
  if (!block) return

  block.setWarningText?.(message)

  if (block.warning?.setBubbleVisible) {
    block.warning.setBubbleVisible(true)
  }
}

const blockName = (block: any) =>
  block.getFieldValue?.('NAME') || block.getProcedureDef?.()?.[0] || block.type

const findEntryPointBlock = (workspace: Blockly.Workspace) =>
  workspace
    .getAllBlocks(false)
    .find((block: any) => block.type === entryPointType)
/*
const findProcedureBlock = (
  workspace: Blockly.Workspace,
  declaration: string
) =>
  workspace
    .getAllBlocks(false)
    .find((block: any) =>
      block.type === 'procedures_defnoreturn' &&
      blockName(block) === declaration
    )
*/

const normalizeName = (value: string = '') =>
  value.trim().replace(/\s+/g, ' ')

const isProcedureDefinition = (block: any) =>
  block.type === 'procedures_defnoreturn' || block.type === 'procedures_defreturn'

const findProcedureBlock = (
  workspace: Blockly.Workspace,
  declaration: string
) => {
  const procedureBlocks = workspace
    .getAllBlocks(false) 

  console.log('LOOKING PROCEDURE', declaration)
  console.log(
    'PROCEDURE BLOCKS',
    procedureBlocks.map((block: any) => ({
      type: block.type,
      nameField: block.getFieldValue?.('NAME'),
      procedureDef: block.getProcedureDef?.(),
      blockName: blockName(block),
    }))
  )

  return procedureBlocks.find((block: any) =>
    isProcedureDefinition(block) &&
    normalizeName(blockName(block)) === normalizeName(declaration)
  )
}



const blockForResult = (
  workspace: Blockly.Workspace,
  result: MulangExpectationResult
) => {
  if (result.declaration === entryPointType) {
    return findEntryPointBlock(workspace)
  }

  if (result.declaration) {
    return findProcedureBlock(workspace, result.declaration)
  }

  return findEntryPointBlock(workspace)
}

export const showMulangFeedback = (
  workspace: Blockly.Workspace,
  results: MulangExpectationResult[],
  t: TFunction
) => {
  const messagesByBlock = new Map<any, string[]>()

  failedResults(results).forEach(result => {
    const block = blockForResult(workspace, result)
    if (!block) return

    const message = messageForExpectation(result, t)

    const currentMessages = messagesByBlock.get(block) || []
    messagesByBlock.set(block, [...currentMessages, message])
  })

  messagesByBlock.forEach((messages, block) => {
    showWarning(block, messages.join('\n'))
  })
}
