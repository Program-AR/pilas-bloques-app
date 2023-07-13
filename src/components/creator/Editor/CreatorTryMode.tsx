import { Button } from "@mui/material"
import { Ember } from "../../../emberCommunication"
import { LocalStorage } from "../../../localStorage"
import { EMBER_IMPORTED_CHALLENGE_PATH } from "../../ImportedChallengeView"
import { EmberView } from "../../emberView/EmberView"
import { Header, HeaderText } from "../../header/Header"
import { DownloadButton } from "./DownloadButton"
import { SerializedChallenge } from "../../serializedChallenge"
import { NewChallengeButton } from "./NewChallengeButton"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const HeaderContent = (challenge: SerializedChallenge) => {
    const {t} = useTranslation('creator')

    return <>
            <HeaderText text={challenge.title}/>
            <NewChallengeButton/>
            <Link to="/creador/editar"><Button>{t("editor.buttons.keepEditing")}</Button></Link>
            <DownloadButton/>
    </>
}

export const CreatorTryMode = () => {

    const challengeBeingEdited: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    Ember.importChallenge(challengeBeingEdited)
    
    return <>
        <Header CenterComponent={HeaderContent(challengeBeingEdited)}/>
        <EmberView path={EMBER_IMPORTED_CHALLENGE_PATH}/>
    </>
}