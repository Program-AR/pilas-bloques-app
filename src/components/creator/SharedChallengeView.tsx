import { useLoaderData } from "react-router-dom"
import { SerializedChallenge } from "../serializedChallenge"
import { EmberView } from "../emberView/EmberView"
import { EMBER_IMPORTED_CHALLENGE_PATH } from "../ImportedChallengeView"

export const SharedChallengeView = () => {


    const sharedChallenge: SerializedChallenge = useLoaderData() as SerializedChallenge


    const challengeExists = true

    return (<>
        {challengeExists ? (
            <>
                <EmberView height='calc(100% - var(--creator-subheader-height))' path={EMBER_IMPORTED_CHALLENGE_PATH} />
            </>
        ) : <></>}
    </>)
}

