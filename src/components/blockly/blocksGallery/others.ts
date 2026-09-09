import { createCommonBlocklyBlocks, disableUnwantedProcedureBlocks, enableUnwantedProcedureBlocks } from "../utils";
import Blockly, { Block } from "blockly/core"
import { sensorsColor } from "./sensors";
import { javascriptGenerator, Order } from "blockly/javascript";
import { procedsBlocklyInit } from 'blockly-proceds'
import { delegateGenerator } from "../blockly";
import * as Procedures from 'blockly/core/procedures';

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

    javascriptGenerator.forBlock['al_empezar_a_ejecutar'] = function (
        block: any,
        generator: { statementToCode: (arg0: any, arg1: string) => any }
    ) {
        const program = generator.statementToCode(block, 'program');
        return `${program}`;
    };
};

const sanitizeName = (name: string) =>
    (name || '').replace(/[^\p{L}\p{N}_]+/gu, '_').replace(/^(\d)/, '_$1');

const getVariableNameFromBlock = (block: any): string => {
    const fieldVar = block.getFieldValue?.('VAR');
    if (fieldVar) return fieldVar;

    const varsFromBlock = block.getVars?.();
    if (Array.isArray(varsFromBlock) && varsFromBlock.length) {
        return varsFromBlock[0] || '';
    }

    const mutation = block.mutationToDom?.();
    const mutationVar = mutation?.getAttribute?.('var');
    if (mutationVar) return mutationVar;

    return '';
};

/**
 * Creates the following blocks: opAritmetica, param_get, opComparacion, and Procedimientos
 */
export const createOthersBlocks = (t: (key: string) => string) => {
    createCommonBlocklyBlocks(t, othersColor);

    Blockly.Blocks['OpAritmetica'] = {
        init: function () {
            this.jsonInit({
                type: "math_arithmetic",
                message0: "%1 %2 %3",
                colour: sensorsColor,
                inputsInline: true,
                args0: [
                    {
                        type: "input_value",
                        name: "A",
                        check: "Number"
                    },
                    {
                        type: "field_dropdown",
                        name: "OP",
                        options: [
                            ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
                            ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
                            ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
                            ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
                            ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
                        ]
                    },
                    {
                        type: "input_value",
                        name: "B",
                        check: "Number"
                    }
                ],
                output: "Number",
                helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}",
                extensions: ["math_op_tooltip"]
            });
        },
        categoryId: 'operators'
    };

    javascriptGenerator.forBlock['OpAritmetica'] = function (
        block: Block,
        generator: { valueToCode: (arg0: Block, arg1: string, arg2: any) => string }
    ) {
        const OPERATORS = {
            ADD: [' + ', Order.ADDITION],
            MINUS: [' - ', Order.SUBTRACTION],
            MULTIPLY: [' * ', Order.MULTIPLICATION],
            DIVIDE: [' / ', Order.DIVISION],
            POWER: [null, Order.COMMA]
        } as const;

        const op = block.getFieldValue('OP') as keyof typeof OPERATORS;
        const tuple = OPERATORS[op];
        const operator = tuple[0];
        const order = tuple[1];
        const isPow = !operator;
        const isDivision = op === 'DIVIDE';

        const argument0 = generator.valueToCode(block, 'A', order) || '0';
        const argument1 = generator.valueToCode(block, 'B', order) || '0';

        if (isPow) {
            const code = `Math.pow(${argument0}, ${argument1})`;
            return [code, Order.FUNCTION_CALL];
        }

        const code = `
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
        renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
        updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
        displayRenamedVar_: Blockly.Blocks['procedures_defnoreturn'].displayRenamedVar_,
        customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
        categoryId: 'myprocedures'
    };

    Blockly.Blocks['OpComparacion'] = {
        init: function () {
            Blockly.Blocks["logic_compare"].init.call(this);
        },
        categoryId: 'operators',
    };

    delegateGenerator('OpComparacion', 'logic_compare');

    // IMPORTANTE:
    // primero inicializamos proceds, y DESPUÉS sobrescribimos generators.
    enableUnwantedProcedureBlocks();
    (Blockly as any).Procedures = Procedures;
    procedsBlocklyInit(Blockly);
    disableUnwantedProcedureBlocks();

    // Generators custom: tienen que ir DESPUÉS de procedsBlocklyInit.
    javascriptGenerator.forBlock['param_get'] = function (block: Block, generator: any) {
        const varName = getVariableNameFromBlock(block);

        if (!varName) {
            return ['null', Order.ATOMIC];
        }

        if (generator.nameDB_) {
            const safeName = generator.nameDB_.getName(
                varName,
                Blockly.Names.NameType.VARIABLE
            );
            return [safeName, Order.ATOMIC];
        }

        return [varName.replace(/[^\w]/g, '_'), Order.ATOMIC];
    };

    javascriptGenerator.forBlock['variables_get'] = function (block: Block, generator: any) {
        const varName = getVariableNameFromBlock(block);

        if (!varName) {
            return ['null', Order.ATOMIC];
        }

        if (generator.nameDB_) {
            const safeName = generator.nameDB_.getName(
                varName,
                Blockly.Names.NameType.VARIABLE
            );

            return [safeName, Order.ATOMIC];
        }

        return [varName.replace(/[^\w]/g, '_'), Order.ATOMIC];
    };

    javascriptGenerator.forBlock['procedures_defnoreturn'] = function (block: any, generator: any) {
        const rawName = block.getFieldValue('NAME') || 'procedimiento';
        const funcName = sanitizeName(rawName);

        const directParams = [
            ...(Array.isArray(block.arguments_) ? block.arguments_ : []),
            ...(Array.isArray(block.argumentVarModels_)
                ? block.argumentVarModels_.map((m: any) => m?.name || '')
                : [])
        ].filter(Boolean);

        const descendantParams = (block.getDescendants?.(false) || [])
            .filter((child: any) => child.id !== block.id)
            .filter((child: any) => child.type === 'variables_get' || child.type === 'param_get')
            .map((child: any) => {
                const mutation = child.mutationToDom?.();
                const parent = mutation?.getAttribute?.('parent');

                if (parent && parent !== block.id) return '';

                return (
                    child.getFieldValue?.('VAR') ||
                    mutation?.getAttribute?.('var') ||
                    child.getVars?.()?.[0] ||
                    ''
                );
            })
            .filter(Boolean);

        const rawParams = [...new Set([...directParams, ...descendantParams])];

        const params = rawParams.map((param: string) => {
            if (generator.nameDB_) {
                return generator.nameDB_.getName(param, Blockly.Names.NameType.VARIABLE);
            }
            return sanitizeName(param);
        });

        const branch = generator.statementToCode(block, 'STACK') || '';

        return `function ${funcName}(${params.join(', ')}) {\n${branch}}\n`;
    };

    javascriptGenerator.forBlock['procedures_callnoreturn'] = function (block: any, generator: any) {
        const rawName = block.getProcedureCall
            ? block.getProcedureCall()
            : block.getFieldValue('NAME');

        const funcName = sanitizeName(rawName || 'procedimiento');

        const argsCount =
            block.argumentVarModels_?.length ??
            block.arguments_?.length ??
            0;

        const args = Array.from({ length: argsCount }, (_, i) =>
            generator.valueToCode(block, `ARG${i}`, Order.NONE) || 'null'
        );

        return `${funcName}(${args.join(', ')});\n`;
    };
};