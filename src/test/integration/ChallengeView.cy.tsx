import { ChallengeView } from '../../components/challengeView/ChallengeView'
import { mount } from 'cypress/react18'
import { LocalStorage } from '../../localStorage'
import { SerializedChallenge } from '../../components/serializedChallenge'
import { EMBER_IMPORTED_CHALLENGE_PATH } from '../../components/ImportedChallengeView'
import { ThemeContextProvider } from '../../theme/ThemeContext'

describe('Challenge view with blocks', () => {
  const challenge = (solution: string): SerializedChallenge => {
    return {
      fileVersion: 0,
      title: '',
      statement: {
        description: '',
      },
      scene: {
        type: 'Lita',
        maps: [[["A", "L", "-"], ["-", "-", "-"], ["-", "-", "-"]]]
      },
      toolbox: {
        blocks: ["AgarrarLechuga", "MoverACasillaDerecha", "MoverA", "Repetir", "Hasta", "Si", "SiNo", "ParaLaDerecha", "ParaLaIzquierda", "ParaArriba", "ParaAbajo", "Numero", "HayLechuga", "OpAritmetica"],
        categorized: true
      },
      predefinedSolution: solution
    }
  }

  const executeChallengeWithEval = (expression: string, expected: any) => {
    cy.get('[data-testid="scene-iframe"]').should('have.attr', 'data-loaded', 'true').then($iframe => {
      const iframe = $iframe[0] as HTMLIFrameElement;
      cy.get('[data-testid="execute-button"]').click().should('have.attr', 'data-finishedexecution', 'true').then(() => {
        expect((iframe.contentWindow as any).eval(`pilas.escena_actual().${expression}`)).to.equal(expected)
      })
    })
  }


  const testExecutionWithBlocks = (name: string, solution: string, expected: any) => {
    it(name, () => {
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

  const simpleMoveSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="MoverACasillaDerecha"></block>
    </statement>
  </block>
</xml>`

  const moveWithParameterSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="MoverA">
        <value name="direccion">
          <block type="ParaLaDerecha"></block>
        </value>
      </block>
      </statement>
      </block>
      </xml>`

  const ifSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="Si">
        <value name="condition">
          <block type="HayLechuga"></block>
        </value>
        <statement name="block">
          <block type="MoverACasillaDerecha"></block>
        </statement>
      </block>
    </statement>
  </block>
  <block type="SiNo" disabled="true" x="-632" y="103">
    <value name="condition">
    </value>
    <statement name="block1">
    </statement>
    <statement name="block2">
    </statement>
  </block>
</xml>`

  const repeatSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="repetir">
        <value name="count">
          <block type="math_number">
            <field name="NUM">2</field>
          </block>
        </value>
        <statement name="block">
          <block type="MoverACasillaDerecha"></block>
        </statement>
      </block>
    </statement>
  </block>
  <block type="SiNo" disabled="true" x="-632" y="103">
    <value name="condition">
    </value>
    <statement name="block1">
    </statement>
    <statement name="block2">
    </statement>
  </block>
</xml>`

  const repeatUntilSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="Hasta">
        <value name="condition">
          <block type="HayLechuga"></block>
        </value>
        <statement name="block">
          <block type="MoverACasillaDerecha"></block>
        </statement>
      </block>
    </statement>
  </block>
</xml>`

  const operatorSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="Si">
        <value name="condition">
          <block type="OpComparacion">
          <field name="OP">EQ</field>
          <value name="A">
              <block type="Numero">
              <field name="NUM">1</field>
              </block>
            </value>
            <value name="B">
              <block type="Numero">
              <field name="NUM">1</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="block">
          <block type="MoverACasillaDerecha"></block>
        </statement>
      </block>
    </statement>
  </block>
</xml>`

  testExecutionWithBlocks('Execution of a solution has effect on scene view', simpleMoveSolution, 1)

  //Code from blocks have effect 

  testExecutionWithBlocks('Code from blocks have effect - operators', operatorSolution, 1)

  testExecutionWithBlocks('Code from blocks have effect - move with parameters', moveWithParameterSolution, 1)

  testExecutionWithBlocks('Code from blocks have effect -  if', ifSolution, 0)

  testExecutionWithBlocks('Code from blocks have effect - repeat', repeatSolution, 2)

  testExecutionWithBlocks('Code from blocks have effect - repeat until', repeatUntilSolution, 1)
})
