import { fireEvent, render } from '@testing-library/react'
import { Position, SceneCell } from "../components/creator/Editor/SceneEdition/Grid/SceneCell"
import { SceneMap, SceneType, SerializedChallenge, defaultChallenge } from "../components/serializedChallenge"
import { LocalStorage } from "../localStorage"
import { renderComponent } from "./testUtils"
import { CreatorContextProvider } from '../components/creator/Editor/CreatorContext'
import { ACTOR, EMPTY, OBSTACLE } from '../components/creator/Editor/SceneEdition/mapUtils'

describe('Scene grid', () => {

    const position: Position = {
        row: 0,
        column: 0
    }

    const saveChallange = (sceneType: SceneType, maps: SceneMap[]) => {
        const challange: SerializedChallenge = {
            ...defaultChallenge(sceneType),
            scene: {
                type: sceneType,
                maps: maps
            }
        }

        LocalStorage.saveCreatorChallenge(challange)

    }

    beforeEach(() => {
        saveChallange('Duba', [[["-", "O", "-"], ["A", "P", "-"]]])
    })


    afterEach(() => {
        localStorage.clear()
    })

    test('Renders cell with object without errors', () => {
        expect(() => renderComponent(<SceneCell content={OBSTACLE} sceneType={'Duba'} position={position} />)).not.toThrowError()
    })

    test('Renders cell with actor without errors', () => {
        expect(() => renderComponent(<SceneCell content={ACTOR} sceneType={'Duba'} position={position} />)).not.toThrowError()
    })

    test('Renders cell with prize without errors', () => {
        expect(() => renderComponent(<SceneCell content={'P'} sceneType={'Duba'} position={position} />)).not.toThrowError()
    })

    //Tools

    const getContentFromLocalStorage = (row: number, column: number): string => LocalStorage.getCreatorChallenge()!.scene.maps[0][row][column]

    const clickCellWithSelectedTool = (selectedTool: string, row: number, column: number) => {

        const { getByTestId } = render(
            <CreatorContextProvider defaultSelectedTool={selectedTool}>
                <SceneCell content={getContentFromLocalStorage(row, column)} sceneType={"Duba"} position={{ row, column }} />
            </CreatorContextProvider>
        )

        fireEvent.click(getByTestId('challenge-cell'))
    }


    const expectContentAfterClick = (selectedTool: string, row: number, column: number, expected: string) => {
        clickCellWithSelectedTool(selectedTool, row, column)
        expect(getContentFromLocalStorage(row, column)).toBe(expected)
    }

    //OBSTACLE

    test('Sets obstacle in empty cell', () => {
        expectContentAfterClick(OBSTACLE, 0, 0, OBSTACLE)
    })
 
    test('Sets obstacle in cell with prize, should replace prize', () => {
        expectContentAfterClick(OBSTACLE, 1, 1, OBSTACLE)
    })

    test('Obstacle in cell with actor at initial position, should not replace actor', () => {
        LocalStorage.saveCreatorChallenge(defaultChallenge('Duba')) //Default challenge has actor at initial position
        clickCellWithSelectedTool(OBSTACLE, 0, 0)
        expect(getContentFromLocalStorage(0, 0)).toBe(ACTOR)
    })

    test('Sets obstacle in cell with actor, actor should be relocated', () => {
        expectContentAfterClick(OBSTACLE, 1, 0, OBSTACLE)
        expect(getContentFromLocalStorage(0, 0)).toBe(ACTOR)
    })

    test('Sets obstacle in cell with actor and prize, should replace and actor should be relocated', () => {
        saveChallange('Duba', [[["-", "O", "-"], ["A&P", "P", "-"]]])
        expectContentAfterClick(OBSTACLE, 1, 0, OBSTACLE)
        expect(getContentFromLocalStorage(0, 0)).toBe(ACTOR)

    })

    //PRIZES

    test('Sets prize in cell with actor, should have both the actor and the prize', () => {
        expectContentAfterClick('P', 1, 0, 'A&P')
    })

    test('Sets prize in cell with obstacle, should replace obstacle', () => {
        expectContentAfterClick('P', 0, 1, 'P')
    })

    test('Sets prize in emppty cell', () => {
        expectContentAfterClick('P', 0, 0, 'P')
    })

    test('Sets prize in cell with different prize, should replace it', () => {
        saveChallange('Yvoty', [[["T", "O", "-"], ["A", "-", "-"]]])
        expectContentAfterClick('M', 0, 0, 'M')
    })

    test('Sets prize in cell with different prize and actor, should replace prize', () => {
        saveChallange('Yvoty', [[["-", "-", "-"], ["A&K", "-", "-"]]])
        expectContentAfterClick('M', 1, 0, 'A&M')
    })

    //ERASER 
    test('Erase cell with obstacle', () => {
        expectContentAfterClick(EMPTY, 0, 1, EMPTY)
    })

    test('Erase cell with prize', () => {
        expectContentAfterClick(EMPTY, 1, 1, EMPTY)
    })

    test('Erase cell with actor, should relocate actor to initial cell', () => {
        expectContentAfterClick(EMPTY, 1, 0, EMPTY)
        expect(getContentFromLocalStorage(0, 0)).toBe(ACTOR)
    })

    test('Erase cell with actor and prize at initial cell, should relocate actor to initial cell and keep prize', () => {
        saveChallange('Duba', [[["P", "O", "A"], ["-", "P", "-"]]])
        expectContentAfterClick(EMPTY, 0, 2, EMPTY)
        expect(getContentFromLocalStorage(0, 0)).toBe('A&P')
    })

    test('Erase cell with actor and prize, should only erase prize', () => {
        saveChallange('Duba', [[["-", "O", "A&P"], ["-", "P", "-"]]])
        expectContentAfterClick(EMPTY, 0, 2, ACTOR)
    })

    test('Erase cell with actor at initial position, should not erase actor', () => {
        LocalStorage.saveCreatorChallenge(defaultChallenge('Duba')) //Default challenge has actor at initial position
        expectContentAfterClick(EMPTY, 0, 0, ACTOR)
    })

    //ACTOR
    test('Sets actor in cell, should delete it from previous position', () => {
        expectContentAfterClick(ACTOR, 1, 2, ACTOR)
        expect(getContentFromLocalStorage(1, 0)).toBe(EMPTY)
    })

    test('Sets actor in cell with prize, should keep both actor and prize', () => {
        expectContentAfterClick(ACTOR, 1, 1, 'A&P')
    })

    test('Sets actor in cell with obstacle, should replace it', () => {
        expectContentAfterClick(ACTOR, 0, 1, ACTOR)
    })

    test('Sets actor in empty cell', () => {
        expectContentAfterClick(ACTOR, 0, 0, ACTOR)
    })  

    test('Sets actor in cell with previous actor in cell with prize, should not erase the prize', () => {
        saveChallange('Duba', [[["-", "O", "A&P"], ["-", "P", "-"]]])
        expectContentAfterClick(ACTOR, 0, 0, ACTOR)
        expect(getContentFromLocalStorage(0, 2)).toBe('P')
    })

})


