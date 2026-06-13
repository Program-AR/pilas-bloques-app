import * as Blockly from 'blockly/core'
import { parseAll } from './mulang/pilasMulang'
import { analyzeWithMulang } from './mulang/pilasMulangAnalyzer'
import { showMulangFeedback } from './mulang/blockFeedback'

const REQUIRED_PLACEHOLDERS = ['required_value', 'required_statement']

const clearBlockValidation = (block: any) => {
  if (typeof block.setWarningText === 'function') {
    block.setWarningText(null)
  }

  if (block.warning && typeof block.warning.setBubbleVisible === 'function') {
    block.warning.setBubbleVisible(false)
  }

  if (block.warning && typeof block.warning.setVisible === 'function') {
    block.warning.setVisible(false)
  }
}

const markBlockError = (block: any, message: string) => {
  if (typeof block.setWarningText === 'function') {
    block.setWarningText(message)
  }
  if (block.warning && typeof block.warning.setBubbleVisible === 'function') {
    block.warning.setBubbleVisible(true)
  }
}

const isRequiredPlaceholder = (block: any) =>
  block?.isShadow?.() && REQUIRED_PLACEHOLDERS.includes(block.type)

const blockHasMissingInput = (block: any) => {
  return (block.inputList || []).some((input: any) => {
    if (!input.connection) return false

    const targetBlock = input.connection.targetBlock()

    if (!targetBlock) return true

    return isRequiredPlaceholder(targetBlock)
  })
}

export const runBlocklyValidations = async (
  challenge: any
): Promise<boolean> => {
  const workspace = Blockly.getMainWorkspace()
  const blocks = workspace
    .getAllBlocks(false)
    .filter((block: any) => !block.disabled)

  blocks.forEach(clearBlockValidation)

  const invalidBlocks = blocks.filter(blockHasMissingInput)

  invalidBlocks.forEach((block: any) => {
    markBlockError(block, 'Faltan completar bloques obligatorios')
  })

  const mulangResults = analyzeWithMulang(
    workspace as Blockly.WorkspaceSvg,
    challenge
  )

  console.log(JSON.stringify(mulangResults, null, 2))

  showMulangFeedback(workspace, mulangResults)

  const hasCriticalErrors = mulangResults.some(
    result => result.result === false && result.isCritical
  )

  return invalidBlocks.length === 0 && !hasCriticalErrors
}