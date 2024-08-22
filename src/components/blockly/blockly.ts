import { BlockType, categories } from "./blocks"
import Es from 'blockly/msg/es';
import Blockly, { Block } from "blockly/core"
import { javascriptGenerator, Order } from 'blockly/javascript'
import { enableUnwantedProcedureBlocks, disableUnwantedProcedureBlocks } from "./utils";
import 'blockly/blocks';
import { createPrimitiveBlocks } from "./blocksGallery/primitives";
import { createSensorBlocks } from "./blocksGallery/sensors";
import { createValueBlocks } from "./blocksGallery/values";
import { createControlStructureBlocks } from "./blocksGallery/controlStructures";
import { createFirstBlock, createOthersBlocks } from "./blocksGallery/others";

Blockly.setLocale(Es); // TODO: this needs to be taken from chosen intl

export type BlocklyBlockDefinition = {
  type?: string
  inputs?: any
  message0: string
  args0: any[]
  message1?: string
  args1?: any[]
  colour: string
  toolbox?: string
  previousStatement?: any
  nextStatement?: any
  inputsInline?: any
  output?: any
  helpUrl?: any
  code?: string
}

export type Toolbox = { kind: "categoryToolbox" | "flyoutToolbox", contents: ToolboxItem[] }
type ToolboxItem = ToolboxBlock | ToolBoxCategory
type ToolboxBlock = { kind: "block", type: string }
type ToolBoxCategory = { kind: "category" | '', name: string, contents: ToolboxItem[] }

export const xmlBloqueEmpezarAEjecutar = `<xml xmlns="http://www.w3.org/1999/xhtml">
              <block type="al_empezar_a_ejecutar" x="15" y="15"></block>
            </xml>`

export const setupBlocklyBlocks = (t: (key: string) => string) => {

  defineBlocklyTranslations(t)

  createFirstBlock(t)

  createPrimitiveBlocks(t)

  createSensorBlocks(t)

  createValueBlocks(t)

  createControlStructureBlocks(t)

  createOthersBlocks(t)

  createCommonCode()
}

export const setXml = (xml: string) => {
  Blockly.Xml.domToWorkspace(
    Blockly.utils.xml.textToDom(xml),
    Blockly.getMainWorkspace()
  );
}

export const setupBlockly = (container: Element, workspaceConfiguration: Blockly.BlocklyOptions) => {
  container.replaceChildren() //Removes previous injection, otherwise it might keep inserting below the current workspace
  container.ariaValueText = 'child-blockly'
  Blockly.inject(container, workspaceConfiguration)
}

export const workspaceToCode = () => javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace())

/**
 * Some blocks, like "Repetir" need to be attached to a math_number block on toolbox, that's why they have toolboxJSON property
 */
const blockTypeToToolboxBlock = (block: BlockType): any => block.toolboxJSON ? block.toolboxJSON : { kind: "block", type: block.id }

export const createGenericJSCode = (id: string, customCode: string) => {
  javascriptGenerator.forBlock[id] = function (block: Block, generator: { statementToCode: (arg0: any, arg1: string) => any; valueToCode: (arg0: Block, arg1: string, arg2: Order) => any; }) {
    let variables = customCode.match(/\$(\w+)/g);
    let code = customCode;
    if (variables) {
      variables.forEach((v) => {
        let regex = new RegExp('\\' + v, "g");
        let variable_name = v.slice(1);

        var variable_object = null;

        if (variable_name === "DO") {
          variable_object = generator.statementToCode(block, variable_name);
        } else {
          variable_object = generator.valueToCode(block, variable_name, Order.ATOMIC) || block.getFieldValue(variable_name) || null;
        }

        code = code.replace(regex, variable_object);
      });
    }

    return code;
  };
}

export const messageBlock = (message: string) => {
  if (message.includes('%1'))
    return `%2 ${message}`
  return `%1 ${message}`
}

const createCommonCode = () => {
  javascriptGenerator.addReservedWords('main', 'hacer', 'out_hacer', 'evaluar');

  javascriptGenerator.required_value = function () {
    return null
  };

  javascriptGenerator.required_statement = function () {
    return null
  };

  javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  javascriptGenerator.addReservedWords('highlightBlock');
}


const defineBlocklyTranslations = (t: (key: string) => string) => {
  Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE = t("procedures.name")
  Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = t("procedures.definition")
  Blockly.Msg.PROCEDURES_BEFORE_PARAMS = t("procedures.paramWith")
  Blockly.Msg.PROCEDURES_PARAMETER = t("procedures.paramName")
  Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS = t("procedures.paramWith")
  Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP = t("procedures.create")
  Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT = t("procedures.comment")
  Blockly.Msg.PROCEDURES_DEFNORETURN_NOPARAMS = t("procedures.noParams")
  Blockly.Msg.PROCEDURES_ADD_PARAMETER = t("procedures.addParam")
  Blockly.Msg.PROCEDURES_ADD_PARAMETER_PROMPT = t("procedures.addParamPrompt")
  Blockly.Msg.PROCEDURES_REMOVE_PARAMETER = t("procedures.removeParam")
  Blockly.Msg.PROCEDURES_CREATE_DO = t("contextMenu.createProcedure")
  Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE = t("procedures.name")
  Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = t("procedures.definition")
  Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP = t("procedures.create")
  Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT = t("procedures.comment")
  Blockly.Msg.PROCEDURES_DEFRETURN_NOPARAMS = t("procedures.noParams")
  Blockly.Msg.ADD_COMMENT = t("contextMenu.addComment")
  Blockly.Msg.REMOVE_COMMENT = t("contextMenu.removeComment")
  Blockly.Msg.DUPLICATE_BLOCK = t("contextMenu.duplicate")
  Blockly.Msg.HELP = t("contextMenu.help")
  Blockly.Msg.DELETE_BLOCK = t("contextMenu.deleteOne")
  Blockly.Msg.DELETE_X_BLOCKS = t("contextMenu.deleteMany")
  Blockly.Msg.DISABLE_BLOCK = t("contextMenu.disable")
  Blockly.Msg.ENABLE_BLOCK = t("contextMenu.enable")
  Blockly.Msg.UNDO = t("contextMenu.undo")
  Blockly.Msg.REDO = t("contextMenu.redo")
  Blockly.Msg.CLEAN_UP = t("contextMenu.cleanUp")
  Blockly.Msg.EXTERNAL_INPUTS = t("contextMenu.externalInputs")


  // ProcedsBlockly.init() needs all procedure blocks to work, so we need to put them back
  // After calling init(), we disable unwanted toolbox blocks again
  enableUnwantedProcedureBlocks()
  //ProcedsBlockly.init()
  disableUnwantedProcedureBlocks()
}

export const categorizedToolbox = (t: (key: string) => string, blocks: BlockType[]): Toolbox => {

  const categoryBlocksFor = (categoryId: string): ToolboxItem => {
    const contents = blocks.filter(block => block.categoryId === categoryId).map(blockTypeToToolboxBlock)
    return contents.length ? {
      kind: "category",
      name: `${t(`categories.${categoryId}`)}`,
      contents: contents
    } : {
      kind: '',
      name: '',
      contents: []
    }
  }

  return ({
    kind: "categoryToolbox",
    contents: categories.map(category => categoryBlocksFor(category))
  })
}

export const uncategorizedToolbox = (blocks: BlockType[]): Toolbox => ({
  kind: "flyoutToolbox",
  contents: blocks.map(blockTypeToToolboxBlock)
})