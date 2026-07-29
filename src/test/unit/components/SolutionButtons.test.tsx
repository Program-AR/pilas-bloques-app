import { screen, fireEvent } from '@testing-library/react'
import { sanitizeActivityName, SolutionButtons } from '../../../components/challengeView/SolutionButtons'
import { renderComponent } from '../../testUtils'
import { LocalStorage } from '../../../localStorage'

jest.mock('../../../localStorage', () => ({
  LocalStorage: {
    getMulangSuggestionsEnabled: jest.fn(() => true),
    saveMulangSuggestionsEnabled: jest.fn(),
    getCreatorChallenge: jest.fn(() => ({ title: 'test' })),
    getSelectedLocale: jest.fn(() => 'es-ar'),
  }
}))

jest.mock('../../../components/blockly/blocklyValidations')

describe('SolutionButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
      // resetMocks:true (jest config) wipes jest.fn() implementations before each test,
      // so we restore the ones this test depends on.
      ; (LocalStorage.getMulangSuggestionsEnabled as jest.Mock).mockReturnValue(true)
      ; (LocalStorage.getCreatorChallenge as jest.Mock).mockReturnValue({ title: 'test' })
      ; (LocalStorage.getSelectedLocale as jest.Mock).mockReturnValue('es-ar')
  })

  test('renders toggle suggestions button and toggles state', async () => {
    renderComponent(<SolutionButtons direction="row" />)

    // The switch uses a checkbox input under the hood
    const toggleInput = await screen.findByRole('checkbox')
    expect(toggleInput).toBeInTheDocument()

    // Should be initially checked because getMulangSuggestionsEnabled returns true
    expect(toggleInput).toBeChecked()

    // Click to toggle
    fireEvent.click(toggleInput)

    // Should now be unchecked
    expect(toggleInput).not.toBeChecked()

    // Should have saved the new state to localStorage
    expect(LocalStorage.saveMulangSuggestionsEnabled).toHaveBeenCalledWith(false)
  })

  test('uses the provided challenge identifier to build the file name', () => {
    expect(sanitizeActivityName('mi desafío 1')).toBe('MiDesafio1')
  })

  test('uses the creator title as fallback when no challenge title is provided', () => {
    ;(LocalStorage.getCreatorChallenge as jest.Mock).mockReturnValue({ title: 'desafío de prueba' })

    expect(sanitizeActivityName()).toBe('DesafioDePrueba')
  })

  test('uses the provided challenge id to build the file name', () => {
    expect(sanitizeActivityName('1233')).toBe('1233')
  })

})
