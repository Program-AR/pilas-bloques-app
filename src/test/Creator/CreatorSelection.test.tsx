import { screen } from '@testing-library/react'
import { ActorSelection } from '../../components/creator/ActorSelection/ActorSelection';
import { LocalStorage } from '../../localStorage';
import { defaultChallenge } from "../../components/serializedChallenge"
import { renderComponent } from '../testUtils';

describe('Creator selection', () => {
    afterEach(() => {
        localStorage.clear()
    })

    test('Shows warning modal if there is a challenge in progress', async () => {
        LocalStorage.saveCreatorChallenge(defaultChallenge("Duba"))
        renderComponent(<ActorSelection />)
    
        const dialog = await screen.findByTestId("challenge-progress-warning")
    
        expect(dialog).toBeTruthy()
    
    })
    
    test('Should not show warning modal if there is no challenge in progress', async () => {
        renderComponent(<ActorSelection />)
    
        const find: Promise<HTMLElement> = screen.findByTestId("challenge-progress-warning")
    
        await expect(find).rejects.toThrow()
    })
})
