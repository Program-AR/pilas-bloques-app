import { ChallengeUpsertButton, ShareButtons } from "../components/creator/Editor/ActionButtons/ShareChallenge/ShareModalButtons"
import { CreatorContextProvider } from "../components/creator/Editor/CreatorContext"
import { SerializedChallenge } from "../components/serializedChallenge"
import { LocalStorage } from "../localStorage"
import { User } from "../pbApi"
import { renderComponent } from "./testUtils"
import { act, screen } from '@testing-library/react'

jest.mock("../pbApi", () => {
    return {
        PilasBloquesApi: ({
            shareChallenge: (challenge: SerializedChallenge) => {
                challenge.sharedId = `shared`
                return challenge
            },

            getSharedChallenge: (id: string) => mockChallenge,

        })
    }
})

const mockUser: User = {
    id: "pepita",
    token: "fi3nof",
    nickName: "pepitaGolondrina",
    avatarURL: "pepita",
    answeredQuestionIds: []}

const mockChallenge: SerializedChallenge = {
    fileVersion:1,
    title: "Pepita",
    statement: {
        description: "Pepita",
   },
    scene: {
        type: 'Lita',
        maps: []
    },
    toolbox: {
        blocks: []
    }
}
    
describe("Share by url", () => {

    
    describe("Upsert button", () => {

        const UpsertButton = <ChallengeUpsertButton Icon={<></>} nametag="" challengeUpsert={async () => ""}/>

        test('Should not be able to share challenge if not logged in', async () => {
            renderComponent(UpsertButton)
        
            const shareButton = await screen.findByTestId('upsertButton')
            expect(shareButton.getAttributeNode('disabled')).toBeTruthy()
        })
    
        test('Should be able to share challenge if logged in', async () => {
            LocalStorage.saveUser(mockUser)
            renderComponent(UpsertButton)
        
            const shareButton = await screen.findByTestId('upsertButton')
            expect(shareButton.getAttributeNode('disabled')).toBeFalsy()
        })
    })

    describe("Sharing and saving challenge", () => {

        beforeEach(() => {
            LocalStorage.saveCreatorChallenge(mockChallenge)
        })

        test("Should show share button when the challenge hasn't been shared", async () => {
            renderComponent(<ShareButtons/>)

            const shareButton = await screen.findByTestId('upsertButton')

            expect(shareButton.textContent).toBe("Compartir por url")
        })

        test("Should save sharedId when challenge is shared", async () => {
            renderComponent(<CreatorContextProvider><ShareButtons/></CreatorContextProvider>)
            const shareButton = await screen.findByTestId('upsertButton')
            await act(async () => {shareButton.click()})

            expect(LocalStorage.getCreatorChallenge()!.sharedId).toBe("shared")
        })

    })

})
