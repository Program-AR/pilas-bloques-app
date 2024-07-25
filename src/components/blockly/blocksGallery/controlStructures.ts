import Blockly, { Block } from "blockly/core"
import { javascriptGenerator, Order } from "blockly/javascript";

const controlColor = '#ee7d16';

export const createControlStructureBlocks = (t: (key: string) => string) => {

  const repeatBlocksCode = (id: string) => {
    javascriptGenerator.forBlock[id] = function (block: Block, generator: { valueToCode: (arg0: any, arg1: string, arg2: Order) => string; statementToCode: (arg0: any, arg1: string) => any; addLoopTrap: (arg0: any, arg1: any) => any; nameDB_: { getDistinctName: (arg0: string, arg1: Blockly.Names.NameType) => any; }; }) {
      const repeats = block.getFieldValue('count') || '0';

      var branch = generator.statementToCode(block, 'block');
      branch = generator.addLoopTrap(branch, block);
      var code = '';

      const loopVar = generator.nameDB_.getDistinctName(
        'count', Blockly.Names.NameType.VARIABLE);
      var endVar = repeats;
      if (!repeats.toString().match(/^\w+$/) && Blockly.utils.string.isNumber(repeats)) {
        endVar = generator.nameDB_.getDistinctName(
          'repeat_end', Blockly.Names.NameType.VARIABLE);
        code += 'var ' + endVar + ' = ' + repeats + ';\n';
      }

      code += 'for (var ' + loopVar + ' = 0; ' +
        loopVar + ' < ' + endVar + '; ' +
        loopVar + '++) {\n' +
        branch + '}\n';

      return code;
    };
  }


  Blockly.Blocks['RepetirVacio'] = {
    init: function () {
      this.setColour(controlColor);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendValueInput('count')
        .setCheck('Number')
        .appendField(t('blocks.repeat'))
      this.appendDummyInput()
        .appendField(t('blocks.times'));
      this.appendStatementInput('block');
    },
    categoryId: 'repetitions',
  };

  repeatBlocksCode('RepetirVacio');

  Blockly.Blocks['Repetir'] = {
    init: function () {
      this.setColour(controlColor);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendDummyInput()
        .appendField(t('blocks.repeat'))
      this.jsonInit({
        message0: `%1`,
        args0: [
          {
            "type": "field_number",
            "name": 'count',
            "value": 10,
          }
        ]
      })
      this.appendDummyInput()
        .appendField(t('blocks.times'));
      this.appendStatementInput('block');
    },
    categoryId: 'repetitions',
  };

  repeatBlocksCode('Repetir');

  Blockly.Blocks['Hasta'] = {
    init: function () {
      this.setColour(controlColor);
      this.setInputsInline(true);
      this.appendValueInput('condition')
        .setCheck('Boolean')
        .appendField(t('blocks.while'));
      this.appendStatementInput('block');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
    categoryId: 'repetitions',
  };

  javascriptGenerator.forBlock['Hasta'] = function (block: any, generator: { valueToCode: (arg0: any, arg1: string, arg2: Order) => string; statementToCode: (arg0: any, arg1: string) => any; }) {
    const condition = generator.valueToCode(block, 'condition', Order.ASSIGNMENT) || 'false';
    const contenido = generator.statementToCode(block, 'block');
    return `while (!${condition}) {
        ${contenido}
      }`;
  };

  Blockly.Blocks['Si'] = {
    init: function () {
      this.setColour(controlColor);
      this.appendValueInput('condition')
        .setCheck('Boolean')
        .appendField(t('blocks.simpleAlternative'));
      this.setInputsInline(true);
      this.appendStatementInput('block');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
    categoryId: 'alternatives',
  };

  javascriptGenerator.forBlock['Si'] = function (block: any, generator: { valueToCode: (arg0: any, arg1: string, arg2: Order) => string; statementToCode: (arg0: any, arg1: string) => any; }) {
    const condition = generator.valueToCode(block, 'condition', Order.ATOMIC) || 'false';
    const contenido = generator.statementToCode(block, 'block');
    return `if (${condition}) {
        ${contenido}
      }`;
  };

  Blockly.Blocks['SiNo'] = {
    init: function () {
      this.setColour(controlColor);
      this.appendValueInput('condition')
        .setCheck('Boolean')
        .appendField(t('blocks.simpleAlternative'));
      this.appendStatementInput('block1');
      this.setInputsInline(true);
      this.appendDummyInput()
        .appendField(t('blocks.completeAlternative'));
      this.appendStatementInput('block2');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
    categoryId: 'alternatives',
  };

  javascriptGenerator.forBlock['SiNo'] = function (block: any, generator: { valueToCode: (arg0: any, arg1: string, arg2: Order) => string; statementToCode: (arg0: any, arg1: string) => any; }) {
    const condition = generator.valueToCode(block, 'condition', Order.ASSIGNMENT) || 'false';
    const bloque_1 = generator.statementToCode(block, 'block1');
    const bloque_2 = generator.statementToCode(block, 'block2');

    return `if (${condition}) {
        ${bloque_1}
      } else {
        ${bloque_2}
      }`;
  };
}