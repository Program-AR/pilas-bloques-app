import { screen, fireEvent, waitFor } from '@testing-library/react'
import { SolutionButtons } from '../../../components/challengeView/SolutionButtons'
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

describe('SolutionButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
})
