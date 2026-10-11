import { ChallengeView } from '../../components/challengeView/ChallengeView'
import { mount } from 'cypress/react'
import { LocalStorage } from '../../localStorage'
import { SerializedChallenge } from '../../components/serializedChallenge'
import { EMBER_IMPORTED_CHALLENGE_PATH } from '../../components/ImportedChallengeView'
import { ThemeContextProvider } from '../../theme/ThemeContext'

describe('Challenge view with andBasic block', () => {
  
  const challenge = (solution: string): SerializedChallenge => {
    return {
      fileVersion: 0,
      title: 'Test andBasic',
      statement: {
        description: '',
      },
      scene: {
        type: 'Lita',
        maps: [[["A", "L", "-"], ["-", "-", "-"], ["-", "-", "-"]]]
      },
      toolbox: {
        blocks: ["MoverACasillaDerecha", "Si", "BordeArriba", "BordeAbajo", "andBasic"],
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

  const andVerdaderoVerdadero = `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="Si">
          <value name="condition">
            <block type="andBasic">
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

  const andVerdaderoFalso = `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="Si">
          <value name="condition">
            <block type="andBasic">
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

  const andFalsoVerdadero = `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="Si">
          <value name="condition">
            <block type="andBasic">
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

  const andFalsoFalso = `<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="Si">
          <value name="condition">
            <block type="andBasic">
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

  testExecutionWithBlocks('andBasic Verdadero + Verdadero: Lita se mueve a la derecha', andVerdaderoVerdadero, 1, false)
  testExecutionWithBlocks('andBasic Verdadero + Falso: Lita no se mueve', andVerdaderoFalso, 0, false)
  testExecutionWithBlocks('andBasic Falso + Verdadero: Lita no se mueve', andFalsoVerdadero, 0, false)
  testExecutionWithBlocks('andBasic Falso + Falso: Lita no se mueve', andFalsoFalso, 0, false)
})