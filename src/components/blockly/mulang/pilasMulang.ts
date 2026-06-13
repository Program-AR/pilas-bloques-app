import * as Blockly from 'blockly/core'
import { createEmptyNode, createNode, createReference } from './pilasAst'

const entryPointType = 'al_empezar_a_ejecutar'

const getChild = (block: any) => {
  const statementInput = block.inputList?.find(
    (input: any) => input.type === Blockly.inputs.inputTypes.STATEMENT
  )

  return statementInput?.connection?.targetBlock?.()
}

const getBlockSiblings = (block: any): any[] => {
  const siblings = []
  let current = block.getNextBlock?.()

  while (current) {
    siblings.push(current)
    current = current.getNextBlock?.()
  }

  return siblings
}

const isValue = (block: any) => {
  return !!block.outputConnection
}

const isOperator = (block: any) => {
  return ['OpComparacion', 'OpAritmetica', 'logic_compare', 'math_arithmetic'].includes(block.type)
}

const isProcedureCall = (block: any) => {
  return block.type === 'procedures_callnoreturn'
}

const getName = (block: any) => {
  return block.getFieldValue?.('NAME') || block.getProcedureCall?.() || block.type
}

const getParams = (block: any): string[] => {
  if (Array.isArray(block.arguments_) && block.arguments_.length) return block.arguments_

  if (Array.isArray(block.argumentVarModels_) && block.argumentVarModels_.length) {
    return block.argumentVarModels_
      .map((model: any) => model?.name || '')
      .filter(Boolean)
  }

  return []
}

const searchAlias = (block: any) => {
  const aliases = (Blockly as any).aliases?.(block.type) || []

  for (const alias of aliases) {
    if (pilasToMulangParsers[alias]) {
      return pilasToMulangParsers[alias]
    }
  }

  return undefined
}

const buildBlockAst = (block: any): any => {
  if (!block || block.isShadow?.()) return createEmptyNode()

  const parser = mulangParser(block)

  return createNode(parser.tag, parser.parse(block))
}

const mulangParser = (block: any) => {
  return pilasToMulangParsers[block.type] || searchAlias(block) || (isValue(block) ? referenceParser : applicationParser)
}

const buildSequenceAst = (firstBlock: any): any => {
  if (!firstBlock || firstBlock.isShadow?.()) return createEmptyNode()

  const siblings = getBlockSiblings(firstBlock).filter(block => !block.isShadow?.())

  if (siblings.length) {
    return createNode('Sequence', [firstBlock, ...siblings].map(buildBlockAst))
  }

  return buildBlockAst(firstBlock)
}

const parseMuNumber = (block: any) => {
  return parseFloat(block.getFieldValue('NUM'))
}

const parseEntryPoint = (block: any) => {
  return [
    block.type,
    buildSequenceAst(getChild(block)),
  ]
}

const referenceName = (block: any) => {
  if (isProcedureCall(block)) return block.getProcedureCall?.() || block.getFieldValue?.('NAME')
  if (isOperator(block)) return block.getFieldValue?.('OP')
  return block.type
}

const parseApplication = (block: any) => {
  return [
    createReference(referenceName(block)),
    parseArguments(block),
  ]
}

const parseReference = (block: any) => {
  return referenceName(block)
}

const parseVariable = (block: any) => {
  return block.getFieldValue?.('VAR')
}

const parseArguments = (block: any) => {
  const valueInputs = (block.inputList || [])
    .filter((input: any) => input.type === Blockly.inputs.inputTypes.VALUE)
    .map((input: any) => input.connection?.targetBlock?.())
    .map(buildBlockAst)

  const text = block.getFieldValue?.('texto')

  return text ? valueInputs.concat(createNode('MuString', text)) : valueInputs
}

const parseRepeat = (block: any) => {
  return [
    buildBlockAst(block.getInputTargetBlock?.('count')),
    buildSequenceAst(block.getInputTargetBlock?.('block')),
  ]
}

const parseUntil = (block: any) => {
  return [
    negate(buildBlockAst(block.getInputTargetBlock?.('condition'))),
    buildSequenceAst(block.getInputTargetBlock?.('block')),
  ]
}

const parseIf = (block: any) => {
  return [
    buildBlockAst(block.getInputTargetBlock?.('condition')),
    buildSequenceAst(block.getInputTargetBlock?.('block')),
    createEmptyNode(),
  ]
}

const parseIfElse = (block: any) => {
  return [
    buildBlockAst(block.getInputTargetBlock?.('condition')),
    buildSequenceAst(block.getInputTargetBlock?.('block1')),
    buildSequenceAst(block.getInputTargetBlock?.('block2')),
  ]
}

const parseProcedure = (block: any) => {
  return [
    getName(block),
    createNode('Equation', parseEquation(block)),
  ]
}

const parseEquation = (block: any) => {
  return [
    getParams(block).map(param => createNode('VariablePattern', param)),
    [
      createNode('UnguardedBody', buildSequenceAst(getChild(block))),
    ],
  ]
}

const negate = (condition: any) => ({
  tag: 'Application',
  contents: [
    { tag: 'Primitive', contents: 'Negation' },
    [condition],
  ],
})

const entryPointParser = { tag: 'EntryPoint', parse: parseEntryPoint }
const repeatParser = { tag: 'Repeat', parse: parseRepeat }
const ifParser = { tag: 'If', parse: parseIf }
const untilParser = { tag: 'While', parse: parseUntil }
const numberParser = { tag: 'MuNumber', parse: parseMuNumber }
const procedureParser = { tag: 'Procedure', parse: parseProcedure }
const referenceParser = { tag: 'Reference', parse: parseReference }
const applicationParser = { tag: 'Application', parse: parseApplication }

const pilasToMulangParsers: Record<string, any> = {
  [entryPointType]: entryPointParser,
  Repetir: repeatParser,
  repetir: repeatParser,
  RepetirVacio: repeatParser,
  Si: ifParser,
  SiNo: { ...ifParser, parse: parseIfElse },
  Hasta: untilParser,
  math_number: numberParser,
  Numero: numberParser,
  procedures_defnoreturn: procedureParser,
  variables_get: { ...referenceParser, parse: parseVariable },
  param_get: { ...referenceParser, parse: parseVariable },
}

export const parseAll = (workspace: Blockly.WorkspaceSvg) => {
  const astNodes = workspace.getTopBlocks(false).map(buildBlockAst)
  return createNode('Sequence', astNodes)
}
