import { ShareModal } from "../components/creator/Editor/ActionButtons/ShareChallenge/ShareButton"
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

            //This mocks the scenario where the updated challenge is from another user
            saveChallenge: (challenge: SerializedChallenge) => {
                challenge.sharedId = "newShared"
                return challenge
            }

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

        const shareChallenge = async () => {
            renderComponent(<CreatorContextProvider><ShareModal/></CreatorContextProvider>)
            const shareButton = await screen.findByTestId('upsertButton')
            await act(async () => {shareButton.click()})
        }

        test("Should save sharedId when challenge is shared", async () => {
            await shareChallenge()

            expect(LocalStorage.getCreatorChallenge()!.sharedId).toBe("shared")
        })

        test("Should show share URL on challenge share", async () => {
            await shareChallenge()
            const urlText = await screen.findByRole('textbox')

            expect(urlText.getAttribute('value')).toBe(`${process.env.REACT_APP_PB_APP_URL}/#/desafio/guardado/shared`)
        })

        test("Should change to save button on challenge share", async () => {
            await shareChallenge()
            const saveButton = await screen.findByTestId('upsertButton')
            
            expect(saveButton.textContent).toBe("Guardar desafío")
        })


        test("Should save new sharedId on challenge save if the returned shared id is different", async() => {
            //The mock of the pbApi always returns 'newShared' as id on challenge save
            await shareChallenge()
            const saveButton = await screen.findByTestId('upsertButton')
            await act(async () => {saveButton.click()})

            expect(LocalStorage.getCreatorChallenge()!.sharedId).toBe("newShared")
        })
        
        test.skip("Should change share URL on challenge save if the returned shared id is different", async() => {
            //The mock of the pbApi always returns 'newShared' as id on challenge save
            await shareChallenge()
            const saveButton = await screen.findByTestId('upsertButton')
            await act(async () => {saveButton.click()})
            const urlText = await screen.findByRole('textbox')

            //The url text is not changing in the text
            expect(urlText.getAttribute('value')).toBe(`${process.env.REACT_APP_PB_APP_URL}/#/desafio/guardado/newShared`)
        })

    })

})
