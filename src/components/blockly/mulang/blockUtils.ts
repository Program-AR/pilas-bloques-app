import * as Blockly from 'blockly/core'

export const entryPointType = 'al_empezar_a_ejecutar'

export const allProcedureNames = (workspace: Blockly.Workspace) =>
  workspace
    .getAllBlocks(false)
    .filter((block: any) => block.type === 'procedures_defnoreturn')
    .map((block: any) => block.getFieldValue?.('NAME'))
    .filter(Boolean)

const CONTROL_STRUCTURE_TYPES = [
  'Si', 'SiNo', 'si', 'Sino', 'sino',
  'Repetir', 'repetir', 'Hasta', 'hasta',
  'RepetirVacio'
]

export const isControlStructure = (block: any) =>
  Boolean(block && CONTROL_STRUCTURE_TYPES.includes(block.type))

export const nestsControlStructures = (containerBlock: any) => {
  if (!containerBlock) return false
  const descendants = containerBlock.getDescendants?.(false) || []
  const controlBlocks = descendants.filter(isControlStructure)

  return controlBlocks.some((block: any) => {
    const parent = block.getSurroundParent?.()
    if (isControlStructure(parent)) return true

    const subDescendants = block.getDescendants?.(false) || []
    return subDescendants.slice(1).some(isControlStructure)
  })
}

export const allBlocksNestingControlStructures = (workspace: Blockly.Workspace) => {
  const allBlocks = workspace.getAllBlocks(false)
  const entryPointBlock = allBlocks.find((b: any) => b.type === entryPointType)
  const procedureBlocks = allBlocks.filter((b: any) => b.type === 'procedures_defnoreturn')

  const declarationNames: string[] = []

  if (entryPointBlock && nestsControlStructures(entryPointBlock)) {
    declarationNames.push(entryPointType)
  }

  procedureBlocks.forEach((procBlock: any) => {
    if (nestsControlStructures(procBlock)) {
      const name = procBlock.getFieldValue?.('NAME')
      if (name) {
        declarationNames.push(name)
      }
    }
  })

  return declarationNames
}

export const getNestedControlStructureBlocks = (declarationBlock: any) => {
  if (!declarationBlock) return []
  const descendants = declarationBlock.getDescendants?.(false) || []
  return descendants.filter((block: any) => {
    if (!isControlStructure(block)) return false
    const parent = block.getSurroundParent?.()
    return isControlStructure(parent)
  })
}