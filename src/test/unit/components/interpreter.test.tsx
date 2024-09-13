import { ExecuteButton } from "../../../components/challengeView/SceneButtons/Execute"
import { Challenge } from "../../../staticData/challenges"
import { renderComponent } from "../../testUtils"
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { interpreterFactory } from "../../../components/challengeView/SceneButtons/interpreterFactory"
import { scene } from "../../../components/challengeView/scene"

describe("Interpreter", () => {
    let interpreterMock: any

    beforeEach(() => {

        scene['restartScene'] = (_descriptor: string) => {}

        interpreterMock = {
            run: jest.fn(() => false),
            paused: false,
        }

        interpreterFactory['createInterpreter'] = () => interpreterMock

    })

    const challenge = (): Challenge => {
        return {
            id: 1,
            sceneDescriptor: `new EscenaLita(["[[A,L,T],[-,-,E],[-,-,-]]","[[A,T,L],[-,-,E],[-,-,-]]"])`,
            toolboxBlockIds: ["AgarrarTomate"],
            imageURL: () => ''
        }
    }

    test('Interpreter runs on execution', async () => {
        renderComponent(<ExecuteButton challenge={challenge()} />)
        const button = await screen.findByTestId('execute-button')
        fireEvent.click(button)
        await new Promise(r => setTimeout(r, 2000));
        //await waitFor()
        expect(interpreterMock.run).toHaveBeenCalled();
    })
})