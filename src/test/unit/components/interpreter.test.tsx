import { ExecuteButton } from "../../../components/challengeView/SceneButtons/Execute"
import { Challenge } from "../../../staticData/challenges"
import { renderComponent } from "../../testUtils"
import { screen, fireEvent, waitFor, act } from '@testing-library/react'
import { interpreterFactory } from "../../../components/challengeView/SceneButtons/interpreterFactory"
import { scene } from "../../../components/challengeView/scene"

describe("Interpreter", () => {
    let interpreterMock: any

    beforeEach(() => {

        scene['restartScene'] = (_descriptor: string) => { }

        interpreterMock = {
            run: jest.fn(() => false),
            paused: false,
        }

        interpreterFactory['createInterpreter'] = () => interpreterMock

        scene['isTheProblemSolved'] = () => true

    })

    const challenge: Challenge = {
        id: 1,
        sceneDescriptor: `new EscenaLita(["[[A,L,T],[-,-,E],[-,-,-]]","[[A,T,L],[-,-,E],[-,-,-]]"])`,
        toolboxBlockIds: ["AgarrarTomate"],
        imageURL: () => ''
    }

    test('Interpreter runs on execution', async () => {
        renderComponent(<ExecuteButton challenge={challenge} />)
        const button = await screen.findByTestId('execute-button')
        act(() => {
            fireEvent.click(button);
        });

        await waitFor(() => {
            expect(button).toHaveAttribute('data-finishedexecution', 'true');
        });

        expect(interpreterMock.run).toHaveBeenCalled();
    })
})