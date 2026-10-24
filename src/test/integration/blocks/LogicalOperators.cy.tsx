import { Scene } from '../../../components/serializedChallenge'
import { testCustomChallengeAtColumn } from '../challengeTest'

describe('Logical Operators', () => {
    const scene: Scene = {
        type: 'Lita',
        maps: [[["A", "-", "-"], ["-", "-", "L"]]]
    }

    const trueTrueSolution = (logicBlock: string) => `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
        <statement name="program">
            <block type="Si">
                <value name="condition">
                    <block type="${logicBlock}">
                        <value name="A">
                            <block type="BordeArriba" />
                        </value>
                        <value name="B">
                            <block type="BordeArriba" />
                        </value>
                    </block>
                </value>
                <statement name="block">
                    <block type="MoverACasillaDerecha" />
                </statement>
            </block>
        </statement>
    </block>
  </xml>`

    const trueFalseSolution = (logicBlock: string) => `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
        <statement name="program">
            <block type="Si">
                <value name="condition">
                    <block type="${logicBlock}">
                        <value name="A">
                            <block type="BordeArriba" />
                        </value>
                        <value name="B">
                            <block type="BordeAbajo" />
                        </value>
                    </block>
                </value>
                <statement name="block">
                    <block type="MoverACasillaDerecha" />
                </statement>
            </block>
        </statement>
    </block>
  </xml>`

    const falseTrueSolution = (logicBlock: string) => `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
        <statement name="program">
            <block type="Si">
                <value name="condition">
                    <block type="${logicBlock}">
                        <value name="A">
                            <block type="BordeAbajo" />
                        </value>
                        <value name="B">
                            <block type="BordeArriba" />
                        </value>
                    </block>
                </value>
                <statement name="block">
                    <block type="MoverACasillaDerecha" />
                </statement>
            </block>
        </statement>
    </block>
  </xml>`

    const falseFalseSolution = (logicBlock: string) => `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
        <statement name="program">
            <block type="Si">
                <value name="condition">
                    <block type="${logicBlock}">
                        <value name="A">
                            <block type="BordeAbajo" />
                        </value>
                        <value name="B">
                            <block type="BordeAbajo" />
                        </value>
                    </block>
                </value>
                <statement name="block">
                    <block type="MoverACasillaDerecha" />
                </statement>
            </block>
        </statement>
    </block>
  </xml>`


    const notTrue = `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
        <statement name="program">
            <block type="Si" >
                <value name="condition">
                    <block type="operadorNot" >
                        <value name="BOOL">
                            <block type="BordeArriba" >
                        </value>
                    </block>
                </value>
                <statement name="block">
                    <block type="MoverACasillaDerecha" />
                </statement>
            </block>
        </statement>
    </block>
  </xml>`

    const notFalse = `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
        <statement name="program">
            <block type="Si" >
                <value name="condition">
                    <block type="operadorNot" >
                        <value name="BOOL">
                            <block type="BordeAbajo" >
                        </value>
                    </block>
                </value>
                <statement name="block">
                    <block type="MoverACasillaDerecha" />
                </statement>
            </block>
        </statement>
    </block>
  </xml>`


    testCustomChallengeAtColumn('True OR True moves to the right', scene, trueTrueSolution('orLogic'), 1)
    testCustomChallengeAtColumn('True OR False moves to the right', scene, trueFalseSolution('orLogic'), 1)
    testCustomChallengeAtColumn('False OR True moves to the right', scene, falseTrueSolution('orLogic'), 1)
    testCustomChallengeAtColumn('False OR False does not move to the right', scene, falseFalseSolution('orLogic'), 0)

    testCustomChallengeAtColumn('True AND True moves to the right', scene, trueTrueSolution('andLogic'), 1)
    testCustomChallengeAtColumn('True AND False does not moves to the right', scene, trueFalseSolution('andLogic'), 0)
    testCustomChallengeAtColumn('False AND True does not moves to the right', scene, falseTrueSolution('andLogic'), 0)
    testCustomChallengeAtColumn('False AND False does not move to the right', scene, falseFalseSolution('andLogic'), 0)

    testCustomChallengeAtColumn('NOT True does not move to the right', scene, notTrue, 0)
    testCustomChallengeAtColumn('NOT False move to the right', scene, notFalse, 1)
})
