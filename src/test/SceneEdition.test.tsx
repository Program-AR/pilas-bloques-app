import { fireEvent, screen } from '@testing-library/react'
import { defaultChallenge, SerializedChallenge } from "../components/serializedChallenge"
import { SceneEdition } from '../components/creator/Editor/SceneEdition/SceneEdition';
import { LocalStorage } from '../localStorage';
import { renderWithContext } from './testUtils';

describe('Scene Edition', () => {
    afterEach(() => {
        localStorage.clear()
    })

    beforeEach(() => {
        localStorage.clear()
        LocalStorage.saveCreatorChallenge(defaultChallenge("Lita"))
    })

    const getAmountFromChallenge = async (id: string) => await screen.getAllByTestId(`challenge-${id}`).length

    const getGridSize = async () => {

        const rows = await getAmountFromChallenge('row')
        const columns = await getAmountFromChallenge('cell') / rows

        return {rows, columns}
    }

    test("increment cols and rows to challenge map", async () => {
  
        renderWithContext(<SceneEdition />)

        const incCols = await screen.findByTestId('inc-btn-col')
        const incRows = await screen.findByTestId('inc-btn-row')
                
        fireEvent.click(incCols);
        fireEvent.click(incRows);

        expect((await getGridSize()).rows).toBe(4)
        expect((await getGridSize()).columns).toBe(4)
    })
 
    test("decrement cols and rows to challenge map", async () => {
  
        renderWithContext(<SceneEdition />)

        const decCols = await screen.findByTestId('dec-btn-col')
        const decRows = await screen.findByTestId('dec-btn-row')
                
        fireEvent.click(decCols);
        fireEvent.click(decRows);

        expect((await getGridSize()).rows).toBe(2)
        expect((await getGridSize()).columns).toBe(2)
    })

    test("decrement a col and check if actor changes to [0,0] challenge map cell", async () => {

        let challenge: SerializedChallenge = {
            ...defaultChallenge("Duba"),
            scene: {
                type: "Duba",
                maps: [[["-","-","-","-","-"],["-","-","-","-","A"],["-","-","-","-","-"]]]
            }
        }
    
        LocalStorage.saveCreatorChallenge(challenge)
      
        renderWithContext(<SceneEdition />)

        const decCols = await screen.findByTestId('dec-btn-col')
                
        fireEvent.click(decCols);

        expect((await getGridSize()).columns).toBe(4)
        expect((LocalStorage.getCreatorChallenge())?.scene.maps[0][0][0].includes("A")).toBeTruthy()
    })



})
