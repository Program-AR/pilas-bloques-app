import { render, screen, fireEvent, getByTestId } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { CreatorSelection } from '../components/creator/CreatorSelection';

describe('Creator selection', () => {
    afterEach(() => {
        localStorage.clear()
    })

    test('Shows warning modal if there is a challenge in progress', async () => {
        localStorage.setItem("PB_CREATOR_CHALLENGE", "pepita")
    
        render(<BrowserRouter><CreatorSelection /></BrowserRouter>)
    
        const dialog = await screen.findByTestId("challenge-progress-warning")
    
        expect(dialog).toBeTruthy()
    
    })
    
    test('Should not show warning modal if there is no challenge in progress', async () => {
        render(<BrowserRouter><CreatorSelection /></BrowserRouter>)
    
        const find: Promise<HTMLElement> = screen.findByTestId("challenge-progress-warning")
    
        await expect(find).rejects.toThrow()
    })
})
