import { createCommonBlocklyBlocks, disableUnwantedProcedureBlocks, enableUnwantedProcedureBlocks } from "../utils";
import Blockly, { Block } from "blockly/core"
import { sensorsColor } from "./sensors";
import { javascriptGenerator, Order } from "blockly/javascript";
//@ts-ignore
import { ProcedsBlocklyInit } from "blockly-proceds";

const othersColor = '#cc5b22';
const eventsColor = '#00a65a'; // == boton ejecutar

export const createFirstBlock = (t: (key: string) => string) => {
    Blockly.Blocks['al_empezar_a_ejecutar'] = {
        init: function () {
            this.setColour(eventsColor);
            this.appendDummyInput().appendField(t('blocks.program'));
            this.appendStatementInput('program');
            this.setDeletable(false);
            this.setEditable(false);
            this.setMovable(false);
        },
    };

    javascriptGenerator.forBlock['al_empezar_a_ejecutar'] = function (block: any, generator: { statementToCode: (arg0: any, arg1: string) => any; }) {
        const program = generator.statementToCode(block, 'program');
        const code = `${program}`;
        return code;
    };

}


/**
 * Creates the following blocks: opAritmetica, param_get, opComparacion, and Procedimientos
 * @param t 
 */
export const createOthersBlocks = (t: (key: string) => string) => {

    createCommonBlocklyBlocks(t, othersColor)

    Blockly.Blocks['OpAritmetica'] = {
        init: function () {
            this.jsonInit({
                type: "math_arithmetic",
                message0: "%1 %2 %3",
                colour: sensorsColor,
                inputsInline: true,
                args0: [
                    {
                        "type": "input_value",
                        "name": "A",
                        "check": "Number"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "OP",
                        "options": [
                            ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
                            ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
                            ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
                            ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
                            ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "B",
                        "check": "Number"
                    }
                ],
                output: "Number",
                helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}",
                extensions: ["math_op_tooltip"]
            })
        },
        categoryId: 'operators'
    };

    javascriptGenerator.forBlock['OpAritmetica'] = function (block: Block, generator: { valueToCode: (arg0: Block, arg1: string, arg2: any) => string; }) {
        // Basic arithmetic operators, and power.   
        const OPERATORS = {
            'ADD': [' + ', Order.ADDITION],
            'MINUS': [' - ', Order.SUBTRACTION],
            'MULTIPLY': [' * ', Order.MULTIPLICATION],
            'DIVIDE': [' / ', Order.DIVISION],
            'POWER': [null, Order.COMMA]  // Handle power separately.
        };
        const op = block.getFieldValue('OP');
        const tuple = OPERATORS[op as keyof typeof OPERATORS]
        const operator = tuple[0];
        const order = tuple[1];
        const isPow = !operator;
        const isDivision = op === 'DIVIDE';
        var code;
        const argument0 = generator.valueToCode(block, 'A', order) || '0';
        const argument1 = generator.valueToCode(block, 'B', order) || '0';

        // Power in JavaScript requires a special case since it has no operator.
        if (isPow) {
            code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
            return [code, Order.FUNCTION_CALL];
        }
        code = `
      (function(){
        if (${isDivision} && ${argument1} === 0)
          evaluar("lanzarActividadError('No se puede dividir por 0')")
        else
          return ${argument0 + operator + argument1}
      })()
      `;
        return [code, order];
    };

    Blockly.Blocks['param_get'] = {
        init: Blockly.Blocks['variables_get'].init,
        mutationToDom: Blockly.Blocks['variables_get'].mutationToDom,
        domToMutation: Blockly.Blocks['variables_get'].domToMutation,
        onchange: Blockly.Blocks['variables_get'].onchange,
        categoryId: 'myprocedures',
    };

    Blockly.Blocks['Procedimiento'] = {
        init: Blockly.Blocks['procedures_defnoreturn'].init,
        setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
        updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
        mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
        domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
        decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
        compose: Blockly.Blocks['procedures_defnoreturn'].compose,
        getProcedureDef: Blockly.Blocks['procedures_defnoreturn'].getProcedureDef,
        getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
        getVarModels: Blockly.Blocks['procedures_defnoreturn'].getVarModels,
        renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
        updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
        displayRenamedVar_: Blockly.Blocks['procedures_defnoreturn'].displayRenamedVar_,
        customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
        categoryId: 'myprocedures'
    };

    Blockly.Blocks['OpComparacion'] = {
        init: Blockly.Blocks["logic_compare"].init,
        categoryId: 'operators',
    }
    
    enableUnwantedProcedureBlocks()

    ProcedsBlocklyInit(Blockly)
  
    disableUnwantedProcedureBlocks()
}