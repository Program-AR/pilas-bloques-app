import { EmberView } from "../emberView/EmberView"
import { Header } from "../header/Header"
import { EMBER_IMPORTED_CHALLENGE_PATH } from "../ImportedChallengeView"

export const SharedChallengeView = () => {


    const challengeExists = true

    return (<>
        {challengeExists ? (
            <>
                <Header/>
                <EmberView height='calc(100% - var(--creator-subheader-height))' path={EMBER_IMPORTED_CHALLENGE_PATH} />
            </>
        ) : <></>}
    </>)
}

