import { LocalStorage } from "../../localStorage"
import { EmberView } from "../emberView/EmberView"
import { Header } from "../header/Header"
import { EMBER_IMPORTED_CHALLENGE_PATH } from "../ImportedChallengeView"
import { CreatorViewHeader } from "./Editor/CreatorViewMode"

export const SharedChallengeView = () => {
    
    const challenge = LocalStorage.getImportedChallenge()

    return <>
        <Header CenterComponent={<CreatorViewHeader title={challenge.titulo} />} />
        <EmberView height='100%' path={EMBER_IMPORTED_CHALLENGE_PATH} />
    </>
}

