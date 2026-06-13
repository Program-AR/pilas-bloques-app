import * as Blockly from 'blockly/core'

export const entryPointType = 'al_empezar_a_ejecutar'

export const allProcedureNames = (workspace: Blockly.Workspace) =>
  workspace
    .getAllBlocks(false)
    .filter((block: any) => block.type === 'procedures_defnoreturn')
    .map((block: any) => block.getFieldValue?.('NAME'))
    .filter(Boolean)

export const allBlocksNestingControlStructures = (workspace: Blockly.Workspace) =>
  workspace
    .getAllBlocks(false)
    .filter((block: any) =>
      ['Si', 'SiNo', 'si', 'Sino', 'sino', 'Repetir', 'repetir', 'Hasta', 'hasta'].includes(block.type)
    )
    .filter((block: any) =>
      block
        .getChildren(false)
        .some((child: any) =>
          ['Si', 'SiNo', 'si', 'Sino', 'sino', 'Repetir', 'repetir', 'Hasta', 'hasta'].includes(child.type)
        )
    )
    .map((block: any) => block.type)