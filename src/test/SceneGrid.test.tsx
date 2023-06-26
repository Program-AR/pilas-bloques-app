import { render, screen } from '@testing-library/react'
import { defaultChallenge } from '../components/creator/Selection';
import { LocalStorage } from '../localStorage';
import { SceneGrid } from '../components/creator/SceneGrid';
import { SerializedChallenge } from '../components/serializedChallenge';

describe('Creator selection', () => {

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
        render(<SceneGrid />)

        expect((await getGridSize()).rows).toBe(3)
        expect((await getGridSize()).columns).toBe(5)

    })

    test('Should set grid size according to local storage', async () => {
        localStorage.clear()
        render(<SceneGrid />)

        expect((await getGridSize()).rows).toBe(4)
        expect((await getGridSize()).columns).toBe(4)

    })

})
