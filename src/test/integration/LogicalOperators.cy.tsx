import { ChallengeView } from '../../components/challengeView/ChallengeView'
import { mount } from 'cypress/react'
import { LocalStorage } from '../../localStorage'
import { SerializedChallenge } from '../../components/serializedChallenge'
import { EMBER_IMPORTED_CHALLENGE_PATH } from '../../components/ImportedChallengeView'
import { ThemeContextProvider } from '../../theme/ThemeContext'

describe('Challenge view with blocks - Logical OR Operator', () => {
  const challenge = (solution: string): SerializedChallenge => {
    return {
      fileVersion: 0,
      title: 'Test de Operadores Logicos',
      statement: {
        description: '',
      },
      scene: {
        type: 'Lita',
        maps: [[["A", "L", "-"], ["-", "-", "-"], ["-", "-", "-"]]]
      },
      toolbox: {
        blocks: ["MoverACasillaDerecha", "Si", "BordeArriba", "BordeAbajo", "or_logic", "andBasic"],
        categorized: true
      },
      predefinedSolution: solution
    }
  }

  const executeChallengeWithEval = (expression: string, expected: any) => {
    cy.get('[data-testid="scene-iframe"]')
      .should('have.attr', 'data-loaded', 'true')
      .then($iframe => {
        const iframe = $iframe[0] as HTMLIFrameElement

        cy.get('[data-testid="execute-button"]').click()

        cy.wrap(null).should(() => {
          const value = (iframe.contentWindow as any).eval(`
          pilas.escena_actual().${expression}
        `)

          expect(value).to.equal(expected)
        })
      })
  }

  const testExecutionWithBlocks = (name: string, solution: string, expected: any, skip = false) => {
    (skip ? it.skip : it)(name, () => {
      LocalStorage.saveCreatorChallenge(challenge(solution))
      mount(
        <ThemeContextProvider>
          <ChallengeView
            path={EMBER_IMPORTED_CHALLENGE_PATH} />
        </ThemeContextProvider>
      )
      executeChallengeWithEval('automata.casillaActual().nroColumna', expected)
    })
  }

  const trueOrTrueSolution = (logicBlock: string) => `<xml xmlns="https://developers.google.com/blockly/xml">
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

  const trueOrFalseSolution = (logicBlock: string) => `<xml xmlns="https://developers.google.com/blockly/xml">
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

  const falseOrTrueSolution = (logicBlock: string) => `<xml xmlns="https://developers.google.com/blockly/xml">
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

  const falseOrFalseSolution = (logicBlock: string) => `<xml xmlns="https://developers.google.com/blockly/xml">
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

  testExecutionWithBlocks('True OR True moves to the right', trueOrTrueSolution('or_logic'), 1, false)
  testExecutionWithBlocks('True OR False moves to the right', trueOrFalseSolution('or_logic'), 1, false)
  testExecutionWithBlocks('False OR True moves to the right', falseOrTrueSolution('or_logic'), 1, false)
  testExecutionWithBlocks('False OR False does not move to the right', falseOrFalseSolution('or_logic'), 0, false)

  testExecutionWithBlocks('True AND True moves to the right', trueOrTrueSolution('andBasic'), 1, false)
  testExecutionWithBlocks('True AND False does not moves to the right', trueOrFalseSolution('andBasic'), 0, false)
  testExecutionWithBlocks('False AND True does not moves to the right', falseOrTrueSolution('andBasic'), 0, false)
  testExecutionWithBlocks('False AND False does not move to the right', falseOrFalseSolution('andBasic'), 0, false)
})
