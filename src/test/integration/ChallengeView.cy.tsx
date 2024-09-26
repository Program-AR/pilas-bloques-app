import { ChallengeView } from '../../components/challengeView/ChallengeView'
import { mount } from 'cypress/react18'
import { LocalStorage } from '../../localStorage'
import { SerializedChallenge } from '../../components/serializedChallenge'
import { EMBER_IMPORTED_CHALLENGE_PATH } from '../../components/ImportedChallengeView'
import { ThemeContextProvider } from '../../theme/ThemeContext'

describe('<ChallengeView />', () => {
  const challenge: SerializedChallenge = {
    fileVersion: 0,
    title: '',
    statement: {
      description: '',
    },
    scene: {
      type: 'Lita',
      maps: [[["A", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]]]
    },
    toolbox: {
      blocks: ["MoverACasillaDerecha"],
      categorized: true
    },
    predefinedSolution: `<xml xmlns="http://www.w3.org/1999/xhtml">
                <variables></variables>
                <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
                  <statement name="program">
                    <block type="MoverACasillaDerecha"></block>
                  </statement>
                </block>
              </xml>`
  }
  it('renders', () => {
    LocalStorage.saveCreatorChallenge(challenge)
    mount(
      <ThemeContextProvider>
        <ChallengeView
          path={EMBER_IMPORTED_CHALLENGE_PATH} />
      </ThemeContextProvider>
    )
    cy.get('[data-testid="scene-iframe"]').should('have.attr', 'data-loaded', 'false').then($iframe => {
      const iframe = $iframe[0] as HTMLIFrameElement;
      cy.get('[data-testid="execute-button"]').click()
     //console.log((iframe.contentWindow as any).eval('pilas.escena_actual().automata.casillaActual().nroColumna'))
    })
  })
})

/*
    mountWithThemeContext()
  
      cy.get('[data-testid="scene-iframe"]').should('have.attr', 'data-loaded', 'false').then($iframe => {
      const iframe = $iframe[0] as HTMLIFrameElement; 
      console.log((iframe.contentWindow as any).eval('pilas.escena_actual().automata'))
    })


    mount(<SceneView descriptor={`new EscenaDuba("\
      [O,O,O,O,O,O],\
      [O,-,-,-,O,-],\
      [-,A,-,-,P,-],\
      [-,-,-,O,-,-],\
      [O,O,O,O,-,O],\
    ")`} onLoad={() =>console.log((screen.getByTestId("scene-iframe") as any).contentWindow.eval("pilas.escena_actual().automata"))} />)
 */