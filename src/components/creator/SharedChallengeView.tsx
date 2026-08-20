import { useLoaderData, useParams } from "react-router-dom"
import { LocalStorage } from "../../localStorage"
import { ChallengeView } from "../challengeView/ChallengeView"
import { EmberView } from "../emberView/EmberView"
import { Header } from "../header/Header"
import { EMBER_IMPORTED_CHALLENGE_PATH } from "../ImportedChallengeView"
import { SerializedChallenge } from "../serializedChallenge"
import { CreatorViewHeader } from "./Editor/CreatorViewMode"
import { EmberCreatorViewHeader } from "./Editor/EmberCreatorViewMode"

export const SharedChallengeView = () => {
    const challenge = useLoaderData() as SerializedChallenge

    return <>
        <Header CenterComponent={<CreatorViewHeader title={challenge?.title} />} />
        <ChallengeView path={EMBER_IMPORTED_CHALLENGE_PATH} serializedChallenge={challenge} />
    </>
}

