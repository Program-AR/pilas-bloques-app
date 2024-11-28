import * as Blockly from 'blockly/core'

export type optionType = {
  'comportamiento'?: string
  'argumentos'?: string
  'funcionSensor'?: string
  'valor'?: string
  'code'?: string
}

export const validateRequiredOptions = (name: string, options: optionType, optionsRequiredList: string[]) => {
  optionsRequiredList.forEach((option) => {
    if (!(option in options)) {
      throw new Error(`No se puede crear el bloque ${name} porque no se indicó un valor para la opción ${option}.`);
    }
  });
}

export const shouldAddRequiredShadow = (connection: { getShadowDom: () => null; type: Blockly.ConnectionType; }) =>
  connection.getShadowDom() == null // Should have not a shadow block
  && [Blockly.INPUT_VALUE, Blockly.NEXT_STATEMENT].includes(connection.type) // Should be a "block hole"

export const requiredInput = (block: { inputList?: any[]; getInput?: any; }, inputName: any) => {
  let connection = block.getInput(inputName).connection
  let shadowType = (connection.type == Blockly.INPUT_VALUE)
    ? "required_value"
    : "required_statement"
  var shadowValue = Blockly.utils.xml.textToDom(`<shadow type="${shadowType}"></shadow>`)
  connection.setShadowDom(shadowValue)
  if (!connection.targetConnection)
    connection.respawnShadow_()
}

// Agrega un required shadow a todos los input que sean para encastrar otros bloques
export const requiredAllInputs = (block: { inputList: any[]; }) => {
  block.inputList
    .filter((input: { connection: any; }) => input.connection && shouldAddRequiredShadow(input.connection))
    .forEach((input: { name: any; }) => requiredInput(block, input.name))
}

export const isInsideProcedureDef = (paramBlock: { getRootBlock: () => { (): any; new(): any; id: any; }; $parent: any; }) =>
  paramBlock.getRootBlock().id === paramBlock.$parent


export const isFlying = (block: { getRootBlock: () => any; }) =>
  block.getRootBlock() === block

export const getParams = (procedureBlock: { getProcedureDef: () => any[]; }) =>
  procedureBlock.getProcedureDef()[1]

export const hasParam = (procedureBlock: { getProcedureDef: () => any[]; }, paramBlock: { getFieldValue: (arg0: string) => any; }) => {
  return getParams(procedureBlock).includes(paramBlock.getFieldValue('VAR'))
}

export const clearValidations = (workspace: Blockly.Workspace = Blockly.getMainWorkspace()) => {
  workspace.getAllBlocks(false).forEach(clearValidationsFor)
}

export const clearValidationsFor = (block: { setWarningText: (arg0: null) => void; }) => {
  block.setWarningText(null)
}

const lineWrap = (message: string) => {
  const lineLen = 75
  return message.split(' ').reduce((lines, word) => {
    const lastLine = lines[lines.length - 1]
    if (lastLine.length + word.length > lineLen)
      lines.push(word)
    else
      lines.push(lines.pop() + ' ' + word)
    return lines
  },
    [""]
  ).join('\n  ')
}

const drawWarningIcon = (group: Element | null | undefined, colour: any, secondaryColour: any) => {
  Blockly.utils.dom.createSvgElement('path',
    {
      'd': 'M2,15Q-1,15 0.5,12L6.5,1.7Q8,-1 9.5,1.7L15.5,12Q17,15 14,15z',
      'fill': colour
    },
    group);
  Blockly.utils.dom.createSvgElement('path',
    {
      'd': 'm7,4.8v3.16l0.27,2.27h1.46l0.27,-2.27v-3.16z',
      'fill': secondaryColour
    },
    group);
  Blockly.utils.dom.createSvgElement('rect',
    {
      'fill': secondaryColour,
      'x': '7', 'y': '11', 'height': '2', 'width': '2'
    },
    group);
};

const setWarningColour = (block: { warning: { setVisible: (visible: any) => void; textBubble: { setColour: (arg0: any) => void; }; bubble_: { setColour: (arg0: any) => void; }; iconGroup_: Element | null | undefined; }; }, colour: any, secondaryColour: any) => {
  const unBoundedSetVisible = block.warning.setVisible
  const boundedSetVisible = unBoundedSetVisible.bind(block.warning)
  block.warning.setVisible = (visible) => { 
    boundedSetVisible(visible); 
    if (visible) 
      block.warning.textBubble.setColour(colour) 
  }
  drawWarningIcon(block.warning.iconGroup_, colour, secondaryColour)
}

const addWarningToBlock = (block: { setWarningText?: any; warning: any; }, itemChar: string, message: string, index: any, colour: string, secondaryColour: string, visible = true) => {
  const text = `${itemChar} ${lineWrap(message)}`
  block.setWarningText(text, index)
  setWarningColour(block, colour, secondaryColour)
  block.warning.setVisible(visible)
}

export const addWarning = (block: { setWarningText?: any; warning: any; }, message: string, index?: any, visible?: boolean | undefined) => {
  addWarningToBlock(block, '☆', message, index, 'yellow', 'black', visible)
}

export const addError = (block: { setWarningText?: any; warning: any; }, message: string, index?: undefined, visible?: boolean | undefined) => {
  addWarningToBlock(block, '★', message, index, 'red', 'white', visible)
}

export const disableUnwantedProcedureBlocks = () => {
  ['procedures_defreturn', 'procedures_ifreturn'].forEach(blockType => {
    if (Blockly.Blocks[blockType]) {
      Blockly.Blocks['bkp_' + blockType] = Blockly.Blocks[blockType]
      delete Blockly.Blocks[blockType]
    }
  })
}

export const enableUnwantedProcedureBlocks = () => {
  ['procedures_defreturn', 'procedures_ifreturn'].forEach(blockType => {
    if (Blockly.Blocks['bkp_' + blockType]) Blockly.Blocks[blockType] = Blockly.Blocks['bkp_' + blockType]
  })
}

export const createCommonBlocklyBlocks = (t: (key: string) => string, color: string) => {

  const deletedParameterError = t('blocks.errors.deletedParameter')
  const wrongParameterError = t('blocks.errors.wrongParameter')

  Blockly.Blocks.variables_get = {
    init: function () {
      this.jsonInit({
        "type": "variables_get",
        "message0": "%1",
        "args0": [
          {
            "type": "field_label",
            "name": "VAR",
            "variable": t("procedures.variableName")          }
        ],
        "output": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": "",
      });
    },
    mutationToDom: function () {
      var container = document.createElement('mutation');
      container.setAttribute('var', this.getFieldValue('VAR'));
      if (this.$parent) {
        container.setAttribute("parent", this.$parent);
      }
      return container;
    },
    domToMutation: function (xmlElement: Element) {
      var var_name = xmlElement.getAttribute('var');
      this.setFieldValue(var_name, 'VAR');
      this.$parent = xmlElement.getAttribute("parent") || null;
    },

    onchange: function (event: any) {
      if (event && event.blockId === this.$parent && event.type === Blockly.Events.BLOCK_DELETE) {
        this.dispose();
        return;
      }
      if (this.$parent) { // Este if sirve para las soluciones viejas que no tienen $parent
        var procedureDef = this.workspace.getBlockById(this.$parent)
        var ok = isInsideProcedureDef(this) && hasParam(procedureDef, this)
        //this.setDisabled(!ok)
        this.setEnabled(ok)
        if (ok || isFlying(this) || !procedureDef) {
          clearValidationsFor(this)
        } else {
          var err = (hasParam(procedureDef, this))
            ? wrongParameterError
            : deletedParameterError
          addError(this, err)
        }
      }
    }
  }

  Blockly.Blocks.variables_set = {
    init: function () {
      this.jsonInit({
        "type": "variables_set",
        "message0": "%1 %2",
        "args0": [
          {
            "type": "field_variable",
            "name": "VAR",
            "variable": t("procedures.variableName")
          },
          {
            "type": "input_value",
            "name": "VALUE"
          }
        ],
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": "",
        "extensions": ["contextMenu_variableSetterGetter"]
      });
    }
  }


  Blockly.Blocks['procedures_defreturn'] = {
    /**
     * Block for defining a procedure with a return value.
     * @this {Blockly.Block}
     */
    init: function () {
      var nameField = new Blockly.FieldTextInput(Blockly.Msg['PROCEDURES_DEFRETURN_PROCEDURE'],
        Blockly.Procedures.rename);
      nameField.setSpellcheck(false);
      this.appendDummyInput()
        .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_TITLE'])
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
      this.appendValueInput('RETURN')
        .setAlign(Blockly.inputs.Align.RIGHT)
        .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
      this.setMutator(new Blockly.icons.MutatorIcon(['procedures_mutatorarg'], this));
      if ((this.workspace.options.comments ||
        (this.workspace.options.parentWorkspace &&
          this.workspace.options.parentWorkspace.options.comments)) &&
        Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']) {
        this.setCommentText(Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']);
      }
      this.setStyle('procedure_blocks');
      this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
      this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
      this.arguments_ = [];
      this.argumentVarModels_ = [];
      this.setStatements_(true);
      this.statementConnection_ = null;
    },
    setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
    updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
    mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
    decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
    compose: Blockly.Blocks['procedures_defnoreturn'].compose,
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES have a return value.
     * @this {Blockly.Block}
     */
    getProcedureDef: function () {
      return [this.getFieldValue('NAME'), this.arguments_, true];
    },
    getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
    getVarModels: Blockly.Blocks['procedures_defnoreturn'].getVarModels,
    renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
    updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
    displayRenamedVar_: Blockly.Blocks['procedures_defnoreturn'].displayRenamedVar_,
    customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
    callType_: 'procedures_callreturn'
  };

}