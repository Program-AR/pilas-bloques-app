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
type ToolBoxCategory = { kind: "category" | '', name: string, contents: ToolboxItem[], custom?: string }

export const xmlBloqueEmpezarAEjecutar = `<xml xmlns="http://www.w3.org/1999/xhtml">
              <block type="al_empezar_a_ejecutar" x="15" y="15"></block>
            </xml>`

export const setupBlocklyBlocks = (t: (key: string) => string, simpleReadModeEnabled: boolean = false) => {
  if (simpleReadModeEnabled) {
    const upperMsg: any = {};
    for (const key in Es) {
      upperMsg[key] = typeof (Es as any)[key] === 'string' ? (Es as any)[key].toUpperCase() : (Es as any)[key];
    }
    Blockly.setLocale(upperMsg);
  } else {
    Blockly.setLocale(Es);
  }

  defineBlocklyTranslations(t)

  createFirstBlock(t)

  createPrimitiveBlocks(t)

  createSensorBlocks(t)

  createValueBlocks(t)

  createControlStructureBlocks(t)

  createOthersBlocks(t)

  createShadowBlocks()

  createAliases()

  createCommonCode()
}

const restoreVariablesGetFieldsFromXml = (workspace: Blockly.Workspace, xml: string) => {
  const xmlDom = Blockly.utils.xml.textToDom(xml);
  const xmlBlocks = Array.from(xmlDom.getElementsByTagName('block'));

  xmlBlocks.forEach((xmlBlock) => {
    const type = xmlBlock.getAttribute('type');
    if (type !== 'variables_get' && type !== 'param_get') return;

    const blockId = xmlBlock.getAttribute('id');
    if (!blockId) return;

    const mutationNode = Array.from(xmlBlock.children).find(
      (child) => child.tagName.toLowerCase() === 'mutation'
    );

    const mutationVar = mutationNode?.getAttribute('var');
    if (!mutationVar) return;

    const block = workspace.getBlockById(blockId) as any;
    if (!block) return;

    const field = block.getField?.('VAR');
    if (field) {
      field.setValue(mutationVar);
    }

    if (typeof block.render === 'function') {
      block.render();
    }
  });
};

const removeProcedureMutationsBeforeLoad = (xml: string): Element => {
  const xmlDom = Blockly.utils.xml.textToDom(xml);

  const procedureBlocks = Array.from(xmlDom.getElementsByTagName('block')).filter((node) => {
    const type = node.getAttribute('type');
    return type === 'procedures_defnoreturn' || type === 'procedures_defreturn';
  });

  procedureBlocks.forEach((node) => {
    const mutationNode = Array.from(node.children).find(
      (child) => child.tagName.toLowerCase() === 'mutation'
    );

    if (mutationNode) {
      node.removeChild(mutationNode);
    }
  });

  return xmlDom;
};

export const workspaceToXmlText = () => {
  const workspace = Blockly.getMainWorkspace();
  const xmlDom = Blockly.Xml.workspaceToDom(workspace);

  ensureProcedureMutationsInDom(xmlDom);

  return Blockly.utils.xml.domToText(xmlDom);
};

const ensureProcedureMutationsInDom = (xmlDom: Element) => {
  const blocks = Array.from(xmlDom.getElementsByTagName('block'));

  blocks.forEach((block) => {
    const type = block.getAttribute('type');
    if (type !== 'procedures_defnoreturn' && type !== 'procedures_defreturn') return;

    const hasMutation = Array.from(block.children).some(
      (child) => child.tagName.toLowerCase() === 'mutation'
    );

    if (hasMutation) return;

    const argFields = Array.from(block.children)
      .filter((child) => child.tagName.toLowerCase() === 'field')
      .filter((child) => /^ARG\d+$/.test(child.getAttribute('name') || ''))
      .sort((a, b) => {
        const aNum = Number((a.getAttribute('name') || '').replace('ARG', ''));
        const bNum = Number((b.getAttribute('name') || '').replace('ARG', ''));
        return aNum - bNum;
      });

    if (!argFields.length) return;

    const mutation = document.createElement('mutation');

    argFields.forEach((field) => {
      const arg = document.createElement('arg');
      arg.setAttribute('name', field.textContent || '');
      mutation.appendChild(arg);
    });

    const nameField = Array.from(block.children).find(
      (child) =>
        child.tagName.toLowerCase() === 'field' &&
        child.getAttribute('name') === 'NAME'
    );

    if (nameField && nameField.nextSibling) {
      block.insertBefore(mutation, nameField.nextSibling);
    } else {
      block.insertBefore(mutation, block.firstChild);
    }
  });
};

const getProcedureArgsFromXml = (xml: string): Map<string, string[]> => {
  const xmlDom = Blockly.utils.xml.textToDom(xml);
  const result = new Map<string, string[]>();

  const blocks = Array.from(xmlDom.getElementsByTagName('block'));

  blocks.forEach((block) => {
    const type = block.getAttribute('type');
    if (type !== 'procedures_defnoreturn' && type !== 'procedures_defreturn') return;

    const blockId = block.getAttribute('id');
    if (!blockId) return;

    let argNames: string[] = [];

    const mutationNode = Array.from(block.children).find(
      (child) => child.tagName.toLowerCase() === 'mutation'
    );

    if (mutationNode) {
      argNames = Array.from(mutationNode.children)
        .filter((child) => child.tagName.toLowerCase() === 'arg')
        .map((arg) => arg.getAttribute('name') || '')
        .filter(Boolean);
    }

    if (!argNames.length) {
      argNames = Array.from(block.children)
        .filter((child) => child.tagName.toLowerCase() === 'field')
        .filter((child) => /^ARG\d+$/.test(child.getAttribute('name') || ''))
        .sort((a, b) => {
          const aNum = Number((a.getAttribute('name') || '').replace('ARG', ''));
          const bNum = Number((b.getAttribute('name') || '').replace('ARG', ''));
          return aNum - bNum;
        })
        .map((field) => field.textContent || '')
        .filter(Boolean);
    }

    if (argNames.length) {
      result.set(blockId, argNames);
    }
  });

  return result;
};

const revalidateVariableBlocks = (workspace: Blockly.Workspace) => {
  const blocks = workspace.getAllBlocks(false);

  blocks.forEach((block: any) => {
    if (block.type !== 'variables_get' && block.type !== 'param_get') return;

    // primero intentamos revalidar
    if (typeof block.onchange === 'function') {
      try {
        block.onchange();
      } catch (e) {
        console.error('Error revalidating variable block', {
          blockId: block.id,
          error: e,
        });
      }
    }

    // y después forzamos el estado correcto
    if (typeof block.setDisabled === 'function') {
      block.setDisabled(false);
    }

    if (typeof block.setEnabled === 'function') {
      block.setEnabled(true);
    }

    if (typeof block.setWarningText === 'function') {
      block.setWarningText(null);
    }

    if (block.warning && typeof block.warning.setVisible === 'function') {
      block.warning.setVisible(false);
    }

    if (typeof block.render === 'function') {
      block.render();
    }
  });
};

const restoreProcedureArgsFromXmlMap = (
  workspace: Blockly.Workspace,
  procedureArgsMap: Map<string, string[]>
) => {
  procedureArgsMap.forEach((argNames, blockId) => {
    const block = workspace.getBlockById(blockId) as any;
    if (!block) return;

    // 1) Restaurar estructura interna
    block.arguments_ = [...argNames];

    const variableMap = workspace.getVariableMap();
    block.argumentVarModels_ = argNames.map((name) => {
      let variable = variableMap.getVariable(name);
      if (!variable) {
        variable = variableMap.createVariable(name);
      }
      return variable;
    });

    // 2) Refrescar params internos sin usar domToMutation
    if (typeof block.updateParams_ === 'function') {
      block.updateParams_();
    }

    // 3) Forzar que el texto visible del encabezado muestre los parámetros
    const paramsText = argNames.join(', ');

    const paramsField = block.getField?.('PARAMS');
    if (paramsField) {
      if (typeof paramsField.setValue === 'function') {
        paramsField.setValue(paramsText);
      } else if (typeof paramsField.setText === 'function') {
        paramsField.setText(paramsText);
      }
    } else {
      const topRow = block.getInput?.('TOPROW');
      if (topRow) {
        topRow.appendField(paramsText, 'PARAMS');
      }
    }

    // 4) Render final
    if (typeof block.render === 'function') {
      block.render();
    }
  });
};

export const setXml = (xml: string) => {
  const workspace = Blockly.getMainWorkspace();
  workspace.clear();

  const procedureArgsMap = getProcedureArgsFromXml(xml);
  const xmlDom = removeProcedureMutationsBeforeLoad(xml);

  Blockly.Xml.domToWorkspace(xmlDom, workspace);

  restoreProcedureArgsFromXmlMap(workspace, procedureArgsMap);
  restoreVariablesGetFieldsFromXml(workspace, xml);
  revalidateVariableBlocks(workspace);
};

export const setupBlockly = (container: Element, workspaceConfiguration: Blockly.BlocklyOptions) => {
  container.replaceChildren() //Removes previous injection, otherwise it might keep inserting below the current workspace
  container.ariaValueText = 'child-blockly'
  const workspace = Blockly.inject(container, workspaceConfiguration)
  workspace.addChangeListener(Blockly.Events.disableOrphans);
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

export const delegateGenerator = (aliasType: string, originalType: string) => {
  const original = javascriptGenerator.forBlock[originalType];
  if (!original) {
    throw new Error(`No generator found for ${originalType}`);
  }

  javascriptGenerator.forBlock[aliasType] = function (block: Block, generator: any) {
    return original(block, generator);
  };
};

const createAliases = () => {
  const aliasBlock = (alias: string, original: string, extra?: Partial<any>) => {
    if (!Blockly.Blocks[original]) return;

    Blockly.Blocks[alias] = {
      init: function () {
        Blockly.Blocks[original].init.call(this);
      },
      ...extra,
    };

    if (javascriptGenerator.forBlock[original]) {
      javascriptGenerator.forBlock[alias] = function (block: Block, generator: any) {
        return javascriptGenerator.forBlock[original](block, generator);
      };
    }
  };

  aliasBlock('si', 'Si', { categoryId: 'alternatives' });
  aliasBlock('Sino', 'SiNo', { categoryId: 'alternatives' });
  aliasBlock('sino', 'SiNo', { categoryId: 'alternatives' });
  aliasBlock('hasta', 'Hasta', { categoryId: 'repetitions' });
  aliasBlock('repetir', 'Repetir', { categoryId: 'repetitions' });
};

const createShadowBlocks = () => {
  Blockly.Blocks['required_value'] = {
    init: function () {
      this.appendDummyInput();
      this.setOutput(true);
      this.setColour('#cccccc');
    }
  };

  Blockly.Blocks['required_statement'] = {
    init: function () {
      this.appendDummyInput();
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour('#cccccc');
    }
  };

  javascriptGenerator.forBlock['required_value'] = function () {
    return ['', Order.ATOMIC];
  };

  javascriptGenerator.forBlock['required_statement'] = function () {
    return '';
  };
};


const createCommonCode = () => {
  javascriptGenerator.addReservedWords('main,hacer,out_hacer,evaluar');

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
  const contents = categories
    .map((categoryId) => {
      const categoryContents = blocks
        .filter(block => block.categoryId === categoryId)
        .map(blockTypeToToolboxBlock);

      if (!categoryContents.length) return null;

      return categoryId === 'myprocedures'
        ? {
          kind: "category" as const,
          name: `${t(`categories.${categoryId}`)}`,
          contents: categoryContents,
          custom: "PROCEDURE"
        }
        : {
          kind: "category" as const,
          name: `${t(`categories.${categoryId}`)}`,
          contents: categoryContents,
        };
    })
    .filter(Boolean) as ToolboxItem[];

  return {
    kind: "categoryToolbox",
    contents
  };
}

export const uncategorizedToolbox = (blocks: BlockType[]): Toolbox => ({
  kind: "flyoutToolbox",
  contents: blocks.map(blockTypeToToolboxBlock)
})
