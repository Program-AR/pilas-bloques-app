import { screen } from '@testing-library/react'
import { defaultChallenge } from "../components/serializedChallenge"
import { SceneTools } from '../components/creator/SceneTools';
import { LocalStorage } from '../localStorage';
import { renderComponent } from './testUtils';

describe('Scene Tools', () => {
    afterEach(() => {
        localStorage.clear()
    })

    beforeEach(() => {
        localStorage.clear()
        LocalStorage.saveCreatorChallenge(defaultChallenge("Lita"))
    })

    test('check tool button belongs to the scene ', async () => {
  
        renderComponent(<SceneTools />)

        const toolButton = await screen.findByTestId('L')
            
        expect(toolButton).toBeInTheDocument()
    })

    test('check tool button not belongs to the scene ', async () => {
  
        renderComponent(<SceneTools />)

        const toolButton = screen.queryByTestId('K')
            
        expect(toolButton).toBeNull()
    })
})
