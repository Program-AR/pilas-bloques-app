import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { defaultChallenge } from '../components/creator/Selection';
import { StatementEdition } from '../components/creator/StatementEdition';
import { SerializedChallenge } from '../components/serializedChallenge';
import { LocalStorage } from '../localStorage';
import { renderComponent } from './testUtils';

describe('Statement Edition', () => {
    afterEach(() => {
        localStorage.clear()
    })

    const statementChallenge: SerializedChallenge = {
            fileVersion: 1,
            title: "desafio",
            statement: {
                description: "enunciado",
                clue: ""
            },
            scene:{ 
                type: "Lita",
                maps: [[ 
                    ['L', '-'], 
                    ['A', '-'],
                    ['L', '-'], 
                    ['T', '-']
                ]]
                },
            toolbox: {
                blocks: ['Uno', 'Otro'],
            },
            stepByStep: true
                }

    beforeEach(() => {
        localStorage.clear()
        localStorage.setItem('PB_CREATOR_CHALLENGE', JSON.stringify(statementChallenge))
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

        const item = localStorage.getItem('PB_CREATOR_CHALLENGE')
        const newStatementChallenge = item && JSON.parse(item)
        
        expect(newStatementChallenge.statement.description).toEqual('new statement description')
  
    })
})
