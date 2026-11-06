import { mount } from 'cypress/react18'
import { ChallengeView } from '../../components/challengeView/ChallengeView'
import { ThemeContextProvider } from '../../theme/ThemeContext'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n'
import { setXml } from '../../components/blockly/blockly'
import { Scene, SerializedChallenge } from '../../components/serializedChallenge'
import { LocalStorage } from '../../localStorage'
import { EMBER_IMPORTED_CHALLENGE_PATH } from '../../components/ImportedChallengeView'

type ChallengeTestOptions = {
  solucion: string
  resuelveDesafio?: boolean
  errorEsperado?: string
  descripcionAdicional?: string
  turbo?: boolean
}

const executeChallenge = (turbo = true) => {
  if (turbo) {
    cy.log('⚡️ Activando Modo Turbo')
    cy.get('[data-testid="turbo-switch"] input').first().check({ force: true })
  }
  cy.get('[data-testid="execute-button"]').click()
}

/**
 * Monta el ChallengeView para el desafío dado, carga la solución XML,
 * ejecuta y verifica el resultado esperado.
 *
 * Equivalente a actividadTest() de pilas-bloques-ember.
 *
 * @param challengeId ID numérico del desafío (ej: 1002)
 * @param options Opciones del test
 */
export const challengeTest = (challengeId: number, optionsOrSolucion: ChallengeTestOptions | string) => {
  const options = typeof optionsOrSolucion === 'string' ? { solucion: optionsOrSolucion } : optionsOrSolucion;
  const { solucion, resuelveDesafio = true, errorEsperado, descripcionAdicional, turbo = true } = options

  const testName = descripcionAdicional
    ? descripcionAdicional
    : errorEsperado
      ? `Da error: ${errorEsperado.substring(0, 60)}`
      : `Resuelve el desafío ${challengeId}`

  it(testName, () => {
    // Evitar que Cypress aborte el test por excepciones del motor o de la app
    cy.on('uncaught:exception', () => false)

    cy.intercept('GET', '**/challenges/**', { statusCode: 404 }).as('lastSolution')
    cy.intercept('GET', '**/user-ip**', { statusCode: 200, body: { ip: '127.0.0.1' } }).as('userIp')
    cy.intercept('POST', '**/solutions**', { statusCode: 200 }).as('runProgram')
    cy.intercept('PUT', '**/solutions**', { statusCode: 200 }).as('executionFinished')

    cy.window().then((win) => {
      (win as any).__challengeErrors__ = []
      win.addEventListener('message', (event: MessageEvent) => {
        if (event.data?.tipo === 'error') {
          (win as any).__challengeErrors__.push(event.data.error)
        }
      })
    })

    mount(
      <MemoryRouter initialEntries={[`/desafio/${challengeId}`]}>
        <Routes>
          <Route path="/desafio/:id" element={
            <I18nextProvider i18n={i18n}>
              <ThemeContextProvider>
                <ChallengeView />
              </ThemeContextProvider>
            </I18nextProvider>
          } />
        </Routes>
      </MemoryRouter>
    )

    cy.get('[data-testid="scene-iframe"]', { timeout: 15000 })
      .should('have.attr', 'data-loaded', 'true')

    cy.window().then(() => {
      setXml(solucion)
    })

    if (errorEsperado) {
      cy.log(`🔍 Test esperando error: "${errorEsperado}"`)
    }

    executeChallenge(turbo)

    if (errorEsperado) {
      cy.window({ timeout: 60000 }).should((win) => {
        const errors = (win as any).__challengeErrors__ || []
        const errorMessages = errors.map((e: any) =>
          typeof e === 'string' ? e : e?.message || JSON.stringify(e)
        )
        const found = errorMessages.some((msg: string) =>
          msg.includes(errorEsperado)
        )
        assert(found, `Se esperaba el error: "${errorEsperado}"\nErrores recibidos: ${JSON.stringify(errorMessages)}`)
      })
    } else if (resuelveDesafio) {
      cy.get('.MuiDialog-root', { timeout: 60000 }).should('contain.text', 'Lo lograste')
    } else {
      cy.get('[data-testid="scene-iframe"]').then($iframe => {
        const iframe = $iframe[0] as HTMLIFrameElement
        cy.wrap(null, { timeout: 60000 }).should(() => {
          const isSolved = (iframe.contentWindow as any).eval('pilas.escena_actual().estaResueltoElProblema()')
          expect(isSolved).to.equal(false)
        })
      })
      cy.contains('.MuiDialog-root', 'Lo lograste').should('not.exist')
    }
  })
}

/**
 * Agrupa los tests de un desafío en un describe block.
 * Equivalente a moduloActividad() de pilas-bloques-ember.
 */
export const moduloDesafio = (challengeId: number, tests: () => void) => {
  describe(`Desafío ${challengeId}`, tests)
}

export const customChallenge = (scene: Scene, predefinedSolution: string): SerializedChallenge => ({
  fileVersion: 0,
  title: 'Custom challenge',
  statement: { description: '' },
  toolbox: { blocks: [] },
  scene,
  predefinedSolution
})

export const testCustomChallengeAtColumn = (name: string, scene: Scene, solution: string, column: number, skip = false) => {
  (skip ? it.skip : it)(name, () => {
    LocalStorage.saveCreatorChallenge(customChallenge(scene, solution))
    mount(
      <ThemeContextProvider>
        <ChallengeView path={EMBER_IMPORTED_CHALLENGE_PATH} />
      </ThemeContextProvider>
    )
    executeChallengeWithEval('pilas.escena_actual().automata.casillaActual().nroColumna', column)
  })
}

const executeChallengeWithEval = (expression: string, expected: any) => {
  cy.get('[data-testid="scene-iframe"]')
    .should('have.attr', 'data-loaded', 'true')
    .then($iframe => {
      executeChallenge()
      cy.wrap(null).should(() => {
        const iframe = $iframe[0] as HTMLIFrameElement
        const value = (iframe.contentWindow as any).eval(expression)
        expect(value).to.equal(expected)
      })
    })
}
