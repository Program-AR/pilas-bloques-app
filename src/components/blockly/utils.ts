import Blockly from "blockly/core"

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

export const hasParam = (procedureBlock: { getProcedureDef: () => any[]; }, paramBlock: { getFieldValue: (arg0: string) => any; }) =>
  getParams(procedureBlock).includes(paramBlock.getFieldValue('VAR'))

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

const setWarningColour = (block: { warning: { setVisible: (visible: any) => void; bubble_: { setColour: (arg0: any) => void; }; iconGroup_: Element | null | undefined; }; }, colour: any, secondaryColour: any) => {
  const unBoundedSetVisible = block.warning.setVisible
  const boundedSetVisible = unBoundedSetVisible.bind(block.warning)
  block.warning.setVisible = (visible) => { boundedSetVisible(visible); if (visible) block.warning.bubble_.setColour(colour) }
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
            "type": "field_variable",
            "name": "VAR",
            "variable": t("procedures.variableName")
          }
        ],
        "output": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": "",
        "extensions": ["contextMenu_variableSetterGetter"]
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
        this.setDisabled(!ok)
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

  Blockly.Blocks['procedures_defnoreturn'] = {
    init: function () {
      var nameField = new Blockly.FieldTextInput(Blockly.Msg['PROCEDURES_DEFNORETURN_PROCEDURE'],
        Blockly.Procedures.rename);
      nameField.setSpellcheck(false);
      this.appendDummyInput()
        .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_TITLE'])
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
      this.setMutator(new Blockly.icons.MutatorIcon(['procedures_mutatorarg'], this));
      if ((this.workspace.options.comments ||
        (this.workspace.options.parentWorkspace &&
          this.workspace.options.parentWorkspace.options.comments)) &&
        Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']) {
        this.setCommentText(Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']);
      }
      this.setStyle('procedure_blocks');
      this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
      this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
      this.arguments_ = [];
      this.argumentVarModels_ = [];
      this.setStatements_(true);
      this.statementConnection_ = null;

    },
    /**
     * Add or remove the statement block from this function definition.
     * @param {boolean} hasStatements True if a statement block is needed.
     * @this {Blockly.Block}
     */
    setStatements_: function (hasStatements: boolean) {
      if (this.hasStatements_ === hasStatements) {
        return;
      }
      if (hasStatements) {
        this.appendStatementInput('STACK')
          .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_DO']);
        if (this.getInput('RETURN')) {
          this.moveInputBefore('STACK', 'RETURN');
        }
      } else {
        this.removeInput('STACK', true);
      }
      this.hasStatements_ = hasStatements;
    },
    /**
     * Update the display of parameters for this procedure definition block.
     * @private
     * @this {Blockly.Block}
     */
    updateParams_: function () {

      // Merge the arguments into a human-readable list.
      var paramString = '';
      if (this.arguments_.length) {
        paramString = Blockly.Msg['PROCEDURES_BEFORE_PARAMS'] +
          ' ' + this.arguments_.join(', ');
      }
      // The params field is deterministic based on the mutation,
      // no need to fire a change event.
      Blockly.Events.disable();
      try {
        this.setFieldValue(paramString, 'PARAMS');
      } finally {
        Blockly.Events.enable();
      }
    },
    /**
     * Create XML to represent the argument inputs.
     * @param {boolean=} opt_paramIds If true include the IDs of the parameter
     *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function (opt_paramIds: any) {
      var container = Blockly.utils.xml.createElement('mutation');
      if (opt_paramIds) {
        container.setAttribute('name', this.getFieldValue('NAME'));
      }
      for (var i = 0; i < this.argumentVarModels_.length; i++) {
        var parameter = Blockly.utils.xml.createElement('arg');
        var argModel = this.argumentVarModels_[i];
        parameter.setAttribute('name', argModel.name);
        parameter.setAttribute('varid', argModel.getId());
        if (opt_paramIds && this.paramIds_) {
          parameter.setAttribute('paramId', this.paramIds_[i]);
        }
        container.appendChild(parameter);
      }

      // Save whether the statement input is visible.
      if (!this.hasStatements_) {
        container.setAttribute('statements', 'false');
      }
      return container;
    },
    /**
     * Parse XML to restore the argument inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement: { childNodes: any[]; getAttribute: (arg0: string) => string; }) {
      this.arguments_ = [];
      this.argumentVarModels_ = [];
      for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
        if (childNode.nodeName.toLowerCase() == 'arg') {
          var varName = childNode.getAttribute('name');
          var varId = childNode.getAttribute('varid') || childNode.getAttribute('varId');
          this.arguments_.push(varName);
          var variable = Blockly.Variables.getOrCreateVariablePackage(
            this.workspace, varId, varName, '');
          if (variable != null) {
            this.argumentVarModels_.push(variable);
          } else {
            console.log('Failed to create a variable with name ' + varName + ', ignoring.');
          }
        }
      }
      this.updateParams_();
      Blockly.Procedures.mutateCallers(this);

      // Show or hide the statement input.
      this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this {Blockly.Block}
     */
    decompose: function (workspace: Blockly.Workspace) {
      /*
       * Creates the following XML:
       * <block type="procedures_mutatorcontainer">
       *   <statement name="STACK">
       *     <block type="procedures_mutatorarg">
       *       <field name="NAME">arg1_name</field>
       *       <next>etc...</next>
       *     </block>
       *   </statement>
       * </block>
       */

      var containerBlockNode = Blockly.utils.xml.createElement('block');
      containerBlockNode.setAttribute('type', 'procedures_mutatorcontainer');
      var statementNode = Blockly.utils.xml.createElement('statement');
      statementNode.setAttribute('name', 'STACK');
      containerBlockNode.appendChild(statementNode);

      var node = statementNode;
      for (var i = 0; i < this.arguments_.length; i++) {
        var argBlockNode = Blockly.utils.xml.createElement('block');
        argBlockNode.setAttribute('type', 'procedures_mutatorarg');
        var fieldNode = Blockly.utils.xml.createElement('field');
        fieldNode.setAttribute('name', 'NAME');
        var argumentName = Blockly.utils.xml.createTextNode(this.arguments_[i]);
        fieldNode.appendChild(argumentName);
        argBlockNode.appendChild(fieldNode);
        var nextNode = Blockly.utils.xml.createElement('next');
        argBlockNode.appendChild(nextNode);

        node.appendChild(argBlockNode);
        node = nextNode;
      }

      var containerBlock = Blockly.Xml.domToBlock(containerBlockNode, workspace);

      if (this.type == 'procedures_defreturn') {
        containerBlock.setFieldValue(this.hasStatements_, 'STATEMENTS');
      } else {
        containerBlock.removeInput('STATEMENT_INPUT');
      }

      // Initialize procedure's callers with blank IDs.
      Blockly.Procedures.mutateCallers(this);
      return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    compose: function (containerBlock: { getInputTargetBlock: (arg0: string) => any; getFieldValue: (arg0: string) => any; }) {
      // Parameter list.
      this.arguments_ = [];
      this.paramIds_ = [];
      this.argumentVarModels_ = [];
      var paramBlock = containerBlock.getInputTargetBlock('STACK');
      while (paramBlock) {
        var varName = paramBlock.getFieldValue('NAME');
        this.arguments_.push(varName);
        var variable = this.workspace.getVariable(varName, '');
        this.argumentVarModels_.push(variable);

        this.paramIds_.push(paramBlock.id);
        paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
      }
      this.updateParams_();
      Blockly.Procedures.mutateCallers(this);

      // Show/hide the statement input.
      var hasStatements = containerBlock.getFieldValue('STATEMENTS');
      if (hasStatements !== null) {
        hasStatements = hasStatements == 'TRUE';
        if (this.hasStatements_ != hasStatements) {
          if (hasStatements) {
            this.setStatements_(true);
            // Restore the stack, if one was saved.
            Blockly.icons.MutatorIcon.reconnect(this.statementConnection_, this, 'STACK');
            this.statementConnection_ = null;
          } else {
            // Save the stack, then disconnect it.
            var stackConnection = this.getInput('STACK').connection;
            this.statementConnection_ = stackConnection.targetConnection;
            if (this.statementConnection_) {
              var stackBlock = stackConnection.targetBlock();
              stackBlock.unplug();
              stackBlock.bumpNeighbours();
            }
            this.setStatements_(false);
          }
        }
      }
    },
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     * @this {Blockly.Block}
     */
    getProcedureDef: function () {
      return [this.getFieldValue('NAME'), this.arguments_, false];
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this {Blockly.Block}
     */
    getVars: function () {
      return this.arguments_;
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<!Blockly.VariableModel>} List of variable models.
     * @this {Blockly.Block}
     */
    getVarModels: function () {
      return this.argumentVarModels_;
    },
    /**
     * Notification that a variable is renaming.
     * If the ID matches one of this block's variables, rename it.
     * @param {string} oldId ID of variable to rename.
     * @param {string} newId ID of new variable.  May be the same as oldId, but
     *     with an updated name.  Guaranteed to be the same type as the old
     *     variable.
     * @override
     * @this {Blockly.Block}
     */
    renameVarById: function (oldId: any, newId: any) {
      var oldVariable = this.workspace.getVariableById(oldId);
      if (oldVariable.type != '') {
        // Procedure arguments always have the empty type.
        return;
      }
      var oldName = oldVariable.name;
      var newVar = this.workspace.getVariableById(newId);

      var change = false;
      for (var i = 0; i < this.argumentVarModels_.length; i++) {
        if (this.argumentVarModels_[i].getId() == oldId) {
          this.arguments_[i] = newVar.name;
          this.argumentVarModels_[i] = newVar;
          change = true;
        }
      }
      if (change) {
        this.displayRenamedVar_(oldName, newVar.name);
        Blockly.Procedures.mutateCallers(this);
      }
    },
    /**
     * Notification that a variable is renaming but keeping the same ID.  If the
     * variable is in use on this block, rerender to show the new name.
     * @param {!Blockly.VariableModel} variable The variable being renamed.
     * @package
     * @override
     * @this {Blockly.Block}
     */
    updateVarName: function (variable: { name: any; getId: () => any; }) {
      var newName = variable.name;
      var change = false;
      for (var i = 0; i < this.argumentVarModels_.length; i++) {
        if (this.argumentVarModels_[i].getId() == variable.getId()) {
          var oldName = this.arguments_[i];
          this.arguments_[i] = newName;
          change = true;
        }
      }
      if (change) {
        this.displayRenamedVar_(oldName, newName);
        Blockly.Procedures.mutateCallers(this);
      }
    },
    /**
     * Update the display to reflect a newly renamed argument.
     * @param {string} oldName The old display name of the argument.
     * @param {string} newName The new display name of the argument.
     * @private
     * @this {Blockly.Block}
     */
    displayRenamedVar_: function (oldName: string, newName: any) {
      this.updateParams_();
      // Update the mutator's variables if the mutator is open.
      if (this.mutator && this.mutator.isVisible()) {
        var blocks = this.mutator.workspace_.getAllBlocks(false);
        for (var i = 0, block; (block = blocks[i]); i++) {
          if (block.type == 'procedures_mutatorarg' &&
            Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
            block.setFieldValue(newName, 'NAME');
          }
        }
      }
    },
    /**
     * Add custom menu options to this block's context menu.
     * @param {!Array} options List of menu options to add to.
     * @this {Blockly.Block}
     */
    customContextMenu: function (options: { enabled: boolean; }[]) {
      if (this.isInFlyout) {
        return;
      }
      // Add option to create caller.
      var option = { enabled: true, text: '', callback: () => { } };
      var name = this.getFieldValue('NAME');
      option.text = Blockly.Msg['PROCEDURES_CREATE_DO'].replace('%1', name);
      var xmlMutation = Blockly.utils.xml.createElement('mutation');
      xmlMutation.setAttribute('name', name);
      for (var i = 0; i < this.arguments_.length; i++) {
        var xmlArg = Blockly.utils.xml.createElement('arg');
        xmlArg.setAttribute('name', this.arguments_[i]);
        xmlMutation.appendChild(xmlArg);
      }
      var xmlBlock = Blockly.utils.xml.createElement('block');
      xmlBlock.setAttribute('type', this.callType_);
      xmlBlock.appendChild(xmlMutation);
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);

      // Add options to create getters for each parameter.
      if (!this.isCollapsed()) {
        for (var i = 0; i < this.argumentVarModels_.length; i++) {
          var argOption = { enabled: true, text: '', callback: () => { } };
          var argVar = this.argumentVarModels_[i];
          argOption.text = Blockly.Msg['VARIABLES_SET_CREATE_GET']
            .replace('%1', argVar.name);

          var argXmlField = Blockly.Variables.generateVariableFieldDom(argVar);
          var argXmlBlock = Blockly.utils.xml.createElement('block');
          argXmlBlock.setAttribute('type', 'variables_get');
          argXmlBlock.appendChild(argXmlField);
          argOption.callback =
            Blockly.ContextMenu.callbackFactory(this, argXmlBlock);
          options.push(argOption);
        }
      }
    },
    callType_: 'procedures_callnoreturn',
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