import { javascriptGenerator, Order } from "blockly/javascript";
import { BlocklyBlockDefinition, messageBlock } from "./blockly";
import { optionType, validateRequiredOptions } from "./utils";
import Blockly from "blockly/core"

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
  
    createValueBlock('Booleano', t('blocks.boolean'), { valor: '' }, '',
      {
        message0: t('blocks.boolean'),
        colour: directionsColor,
        type: 'logic_boolean',
        args0: [],
        output: 'Boolean'
      })
  
    createValueBlock('Numero', t('blocks.number'), { valor: '' }, '',
      {
        message0: `%1`,
        colour: directionsColor,
        inputsInline: true,
        args0: [
          {
            "type": "field_number",
            "name": t('blocks.number'),
            "value": 0,
          }
        ],
        output: 'Number'
      })
  
    createValueBlock('Texto', t('blocks.text'), { valor: '' }, '',
      {
        message0: `%1`,
        colour: directionsColor,
        inputsInline: true,
        args0: [
          {
            "type": "field_input",
            "name": t('blocks.text'),
            "text": ''
          }
        ],
        output: 'String'
      })
  }