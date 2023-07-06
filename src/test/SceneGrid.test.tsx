import { render, screen } from '@testing-library/react'
import { defaultChallenge } from '../components/serializedChallenge';
import { LocalStorage } from '../localStorage';
import { SceneCell, SceneGrid } from '../components/creator/SceneGrid';
import { SerializedChallenge } from '../components/serializedChallenge';
import { renderComponent } from './testUtils';

describe('Scene grid', () => {

    const getAmountFromChallenge = async (id: string) => await screen.getAllByTestId(`challenge-${id}`).length

    const getGridSize = async () => {

        const rows = await getAmountFromChallenge('row')
        const columns = await getAmountFromChallenge('cell') / rows

        return {rows, columns}
    }

    afterEach(() => {
        localStorage.clear()
    })

    test('Should set grid size according to local storage', async () => {

        const challenge: SerializedChallenge = {
            ...defaultChallenge("Duba"),
            scene: {
                type: "Duba",
                maps: [[["A","-","-","-","-"],["-","-","-","-","-"],["-","-","-","-","-"]]]
            }
        }

        LocalStorage.saveCreatorChallenge(challenge)
        render(<SceneGrid mapIndex={0}/>)

        expect((await getGridSize()).rows).toBe(3)
        expect((await getGridSize()).columns).toBe(5)

    })

    test('Should set grid size to default when there is no challenge saved', async () => {
        localStorage.clear()
        render(<SceneGrid mapIndex={0}/>)

        expect((await getGridSize()).rows).toBe(3)
        expect((await getGridSize()).columns).toBe(3)

    })

    test('Should have both object images in a cell when there is a & operator', async () =>{
        const challenge: SerializedChallenge = {
            ...defaultChallenge("Duba"),
            scene: {
                type: "Duba",
                maps: [[["A&P"]]]
            }
        }
        
        LocalStorage.saveCreatorChallenge(challenge)
        render(<SceneGrid />)
        expect(await getAmountFromChallenge('cell-image')).toBe(2)
    })

    test('Renders cell with object without errors', () =>{
        expect(() => renderComponent(<SceneCell content={'O'} sceneType={'Lita'}/>)).not.toThrowError()
    })

    test('Renders cell with actor without errors', () =>{
        expect(() => renderComponent(<SceneCell content={'A'} sceneType={'Lita'}/>)).not.toThrowError()
    })

    test('Renders cell with prize without errors', () =>{
        expect(() => renderComponent(<SceneCell content={'P'} sceneType={'Duba'}/>)).not.toThrowError()
    })

})
