import { javascriptGenerator, Order } from "blockly/javascript";
import { BlocklyBlockDefinition, messageBlock } from "../blockly";
import { optionType, validateRequiredOptions } from "../utils";
import Blockly, { Block } from "blockly/core"

const directionsColor = '#2ba4e2';

const createValueBlock = (id: string, message: string, options: optionType, icon: string, blockDefinition?: BlocklyBlockDefinition) => {
  validateRequiredOptions(id, options, ['valor']);

  const jsonInit: BlocklyBlockDefinition = (blockDefinition ? blockDefinition : {
    message0: `${message}`,
    colour: directionsColor,
    args0: [],
    output: 'String'
  })

  if (icon) {
    jsonInit.message0 = messageBlock(message)
    jsonInit.args0.push({
      "type": "field_image",
      "src": `imagenes/iconos/${icon}`,
      "width": 16,
      "height": 16,
      "alt": "*"
    })
  }

  Blockly.Blocks[id] = {
    init: function () {
      this.jsonInit(jsonInit)
    }
  }

  javascriptGenerator.forBlock[id] = function () {
    return [`'${options.valor}'`, Order.ATOMIC];
  };

}

export const createValueBlocks = (t: (key: string) => string) => {

  createValueBlock("ParaLaDerecha", t('blocks.right'), {
    valor: 'derecha',
  }, 'icono.derecha.png',
  );

  createValueBlock('ParaLaIzquierda', t('blocks.left'), {
    valor: 'izquierda',
  }, 'icono.izquierda.png',
  );

  createValueBlock('ParaArriba', t('blocks.up'), {
    valor: 'arriba',
  }, 'icono.arriba.png',
  );

  createValueBlock('ParaAbajo', t('blocks.down'), {
    valor: 'abajo',
  }, 'icono.abajo.png',
  );


  Blockly.Blocks['Booleano'] = {
    init: Blockly.Blocks['logic_boolean'].init,
    categoryId: Blockly.Blocks['logic_boolean'].categoryId,
  }

  javascriptGenerator.forBlock['Booleano'] = function (block: Block) {
    return [`${(block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false'}`, Order.ATOMIC];
  }

  Blockly.Blocks['Numero'] = {
    init: Blockly.Blocks['math_number'].init,
    categoryId: Blockly.Blocks['math_number'].categoryId,
  }

  javascriptGenerator.forBlock['Numero'] = function (block: Block) {
    return [`${block.getFieldValue('NUM')}`, Order.ATOMIC];
  };

  Blockly.Blocks['Texto'] = {
    init: Blockly.Blocks['text'].init,
    categoryId: Blockly.Blocks['text'].categoryId,
  }

  javascriptGenerator.forBlock['Texto'] = function (block: Block) {
    return [`${block.getFieldValue('TEXT')}`, Order.ATOMIC];
  };
}