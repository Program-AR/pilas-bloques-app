import { mount } from 'cypress/react18'
import { ChallengeView } from '../../components/challengeView/ChallengeView'
import { ThemeContextProvider } from '../../theme/ThemeContext'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n'
import Blockly from 'blockly/core'

type ChallengeTestOptions = {
  solucion: string
  resuelveDesafio?: boolean
  errorEsperado?: string
  descripcionAdicional?: string
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
  const { solucion, resuelveDesafio = true, errorEsperado, descripcionAdicional } = options

  const testName = descripcionAdicional
    ? descripcionAdicional
    : errorEsperado
      ? `Da error: ${errorEsperado.substring(0, 60)}`
      : `Resuelve el desafío ${challengeId}`

  it(testName, () => {
    cy.intercept('GET', '**/challenges/**', { statusCode: 404 }).as('lastSolution')
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
      const workspace = Blockly.getMainWorkspace()
      const xml = Blockly.utils.xml.textToDom(solucion)
      Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace)
    })

    // Ejecutar el programa
    cy.get('[data-testid="execute-button"]').click()



    if (errorEsperado) {
      cy.window({ timeout: 60000 }).should((win) => {
        const errors = (win as any).__challengeErrors__ || []
        const errorMessages = errors.map((e: any) =>
          typeof e === 'string' ? e : e?.message || JSON.stringify(e)
        )
        const found = errorMessages.some((msg: string) =>
          msg.includes(errorEsperado)
        )
        expect(found, `Se esperaba el error: "${errorEsperado}"\nErrores recibidos: ${JSON.stringify(errorMessages)}`).to.be.true
      })
    } else if (resuelveDesafio) {
      cy.get('.MuiDialog-root', { timeout: 60000 }).should('contain.text', 'Lo lograste')
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
