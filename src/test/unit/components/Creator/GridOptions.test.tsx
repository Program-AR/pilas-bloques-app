import { renderComponent, renderWithContext } from "../../../testUtils"
import { fireEvent, screen } from '@testing-library/react'
import { GridOptions } from "../../../../components/creator/Editor/SceneEdition/GridOptions/GridOptions"
import { LocalStorage } from "../../../../localStorage"
import { SceneMap, SerializedChallenge, defaultChallenge, defaultScene } from "../../../../components/serializedChallenge"
import { ACTOR, EMPTY, OBSTACLE } from "../../../../components/creator/Editor/SceneEdition/mapUtils"
import { CreatorContextProvider } from "../../../../components/creator/Editor/CreatorContext"

describe('Scene grid', () => {

    const saveChallange = (maps: SceneMap[]) => {
        const challange: SerializedChallenge = {
            ...defaultChallenge('Duba'),
            scene: {
                type: 'Duba',
                maps: maps
            }
        }

        LocalStorage.saveCreatorChallenge(challange)
    }
    
    afterEach(() => {
        localStorage.clear()
    })

    beforeEach(() => {
        localStorage.clear()
        saveChallange([[[ACTOR, EMPTY]]])
    })
    
    const clickButtonAtIndex = async (option: string, index: number) => {

        renderComponent(
            <CreatorContextProvider defaultIndex={index}>
                <GridOptions setStyleGrid={()=>{}}/>
            </CreatorContextProvider>
        )
    
        const button = await screen.findByTestId(`${option}-map-button`)
        fireEvent.click(button)
    }

    const confirmDelete = async () => {
        const button = await screen.findByTestId(`generic-ok`)
        fireEvent.click(button)
    }

    const clickDeleteAtIndex = async (index: number) => {
        await clickButtonAtIndex('delete', index)
        await confirmDelete()
    }

    test('Should not delete map when there is only one', async () =>{
        await clickButtonAtIndex('delete', 0)
        expect(LocalStorage.getCreatorChallenge()?.scene.maps.length).toBe(1)
    })

    test('Should delete map at index', async () =>{
        saveChallange([[[ACTOR, EMPTY]], [[EMPTY, EMPTY]]])
        await clickDeleteAtIndex(1)
        const maps = LocalStorage.getCreatorChallenge()!.scene.maps
        expect(maps.length).toBe(1)
        expect(maps[0]).toEqual([[ACTOR, EMPTY]])
    })

    test('Should delete map at index 0 when there are multiple scenarios', async () =>{
        saveChallange([[[ACTOR, EMPTY]], [[EMPTY, EMPTY]]])
        await clickDeleteAtIndex(0)
        const maps = LocalStorage.getCreatorChallenge()!.scene.maps
        expect(maps.length).toBe(1)
        expect(maps[0]).toEqual([[EMPTY, EMPTY]])
    })

    test('Should duplicate map at index', async () =>{
        const map = [[ACTOR, EMPTY, OBSTACLE], [OBSTACLE, EMPTY, OBSTACLE]]
        saveChallange([map])
        await clickButtonAtIndex('duplicate', 0)
        expect(LocalStorage.getCreatorChallenge()?.scene.maps[1]).toEqual(map)
    })
    

})