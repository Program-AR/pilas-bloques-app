import { fireEvent, screen } from '@testing-library/react'
import { defaultChallenge } from "../../components/serializedChallenge"
import { StatementEdition } from '../../components/creator/Editor/ChallengeDetailsEdition/StatementEdition';
import { LocalStorage } from '../../localStorage';
import { renderComponent } from '../testUtils';

describe('Statement Edition', () => {
    afterEach(() => {
        localStorage.clear()
    })

    beforeEach(() => {
        localStorage.clear()
        LocalStorage.saveCreatorChallenge(defaultChallenge("Lita"))
    })

    test('renders statement modal dialog', async () => {
  
        renderComponent(<StatementEdition />)

        const button = await screen.findByTestId('statement-button')
        fireEvent.click(button);

        const input = await screen.findByTestId("statement-input")
    
        expect(input).toBeTruthy()
    })


    test('Updates LocalStorage with new Statement', async () => {
        renderComponent(<StatementEdition />)

        const button = await screen.findByTestId('statement-button')
        fireEvent.click(button);

        const input = await screen.findByTestId("statement-input")
        fireEvent.change(input, { target: {value: 'new statement description'}})
    
        const buttonOk = await screen.findByTestId('generic-ok')
        fireEvent.click(buttonOk);

        const newStatementChallenge = LocalStorage.getCreatorChallenge()
        
        expect(newStatementChallenge?.statement.description).toEqual('new statement description')
  
    })
})
