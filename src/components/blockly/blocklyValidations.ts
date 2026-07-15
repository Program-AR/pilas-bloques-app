import * as Blockly from 'blockly/core'
import { analyzeWithMulang } from './mulang/pilasMulangAnalyzer'
import { showMulangFeedback } from './mulang/blockFeedback'
import { TFunction } from 'i18next'
import { MulangExpectationResult } from './mulang/mulangResults'
import { LocalStorage } from '../../localStorage'

const REQUIRED_PLACEHOLDERS = ['required_value', 'required_statement']

export type BlocklyValidationResult = {
  canRun: boolean
  mulangResults: MulangExpectationResult[]
}

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

const isProcedureDefinition = (block: any) =>
  block.type === 'procedures_defnoreturn' || block.type === 'procedures_defreturn'

const blockHasMissingInput = (block: any) => {
  return (block.inputList || []).some((input: any) => {
    if (!input.connection) return false

    // En Ember, un procedimiento vacío no bloquea ejecución.
    // Lo informa Mulang con do_something, pero se puede ejecutar.
    // Lo dejamos a consideracion de los profes y en tal caso, 
    // quitamos este helper y se vuelve a bloquear.
    if (isProcedureDefinition(block)) return false

    const targetBlock = input.connection.targetBlock()

    if (!targetBlock) return true

    return isRequiredPlaceholder(targetBlock)
  })
}

export const runBlocklyValidations = async (
  challenge: any,
  t: TFunction
): Promise<BlocklyValidationResult> => {
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

  const showSuggestions = LocalStorage.getMulangSuggestionsEnabled()
  const resultsToShow = showSuggestions ? mulangResults : mulangResults.filter(r => r.isCritical)

  showMulangFeedback(workspace, resultsToShow, t)

  const hasCriticalErrors = mulangResults.some(
    result => result.result === false && result.isCritical
  )

  return {
    canRun: invalidBlocks.length === 0 && !hasCriticalErrors,
    mulangResults,
  }
}