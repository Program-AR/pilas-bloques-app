import { fireEvent, getByTestId, render } from '@testing-library/react'
import { Position, SceneCell } from "../components/creator/Editor/SceneEdition/Grid/SceneCell"
import { SerializedChallenge, defaultChallenge } from "../components/serializedChallenge"
import { LocalStorage } from "../localStorage"
import { renderComponent } from "./testUtils"
import { CreatorContext, CreatorContextType, defaultCreatorContext } from '../components/creator/Editor/CreatorContext'

describe('Scene grid', () => {

    let challenge: SerializedChallenge

    const position: Position = {
        row: 0,
        column: 0
    }


    beforeEach(() => {
        challenge = {
            ...defaultChallenge("Duba"),
            scene: {
                type: "Duba",
                maps: [[["-", "O", "-"], ["A", "P", "-"]]]
            }
        }

        LocalStorage.saveCreatorChallenge(challenge)
    })


    afterEach(() => {
        localStorage.clear()
    })

    test('Renders cell with object without errors', () => {
        expect(() => renderComponent(<SceneCell content={'O'} sceneType={'Duba'} position={position} />)).not.toThrowError()
    })

    test('Renders cell with actor without errors', () => {
        expect(() => renderComponent(<SceneCell content={'A'} sceneType={'Duba'} position={position} />)).not.toThrowError()
    })

    test('Renders cell with prize without errors', () => {
        expect(() => renderComponent(<SceneCell content={'P'} sceneType={'Duba'} position={position} />)).not.toThrowError()
    })

    //Tools

    const getContentFromLocalStorage = (row: number, column: number): string => LocalStorage.getCreatorChallenge()!.scene.maps[0][row][column]

    const clickCellWithSelectedTool = (selectedTool: string, row: number, column: number) => {
        let cretorContextProps: CreatorContextType = {
            ...defaultCreatorContext,
            selectedTool: selectedTool,
        }

        const { getByTestId } = render(
            <CreatorContext.Provider value={cretorContextProps}>
                <SceneCell content={getContentFromLocalStorage(row, column)} sceneType={'Duba'} position={{ ...position, row, column }} />
            </CreatorContext.Provider>
        )

        fireEvent.click(getByTestId('challenge-cell'))
    }


    const expectContentAfterClick = (selectedTool: string, row: number, column: number, expected: string) => {
        clickCellWithSelectedTool(selectedTool, row, column)
        expect(getContentFromLocalStorage(row, column)).toBe(expected)
    }

    test('Sets obstacle in empty cell', () => {
        expectContentAfterClick('O', 0, 0, 'O')
    })

    test('Sets obstacle in cell with prize, should replace prize', () => {
        expectContentAfterClick('O', 1, 1, 'O')
    })

    test('Obstacle in cell with actor at initial position, should not replace actor', () => {
        LocalStorage.saveCreatorChallenge(defaultChallenge('Duba')) //Default challenge has actor at initial position
        clickCellWithSelectedTool('O', 0, 0)
        expect(getContentFromLocalStorage(0, 0)).toBe('A')
    })

    test('Sets obstacle in cell with actor, actor should be relocated', () => {
        expectContentAfterClick('O', 1, 0, 'O')
        expect(getContentFromLocalStorage(0, 0)).toBe('A')
    })

    test('Sets obstacle in cell with actor and prize, should replace and actor should be relocated', () => {
        challenge = {
            ...defaultChallenge("Duba"),
            scene: {
                type: "Duba",
                maps: [[["-", "O", "-"], ["A&P", "P", "-"]]]
            }
        }

        expectContentAfterClick('O', 1, 0, 'O')
        expect(getContentFromLocalStorage(0, 0)).toBe('A')

    })





})


