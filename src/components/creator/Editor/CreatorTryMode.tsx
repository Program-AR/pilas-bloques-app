import { Stack } from "@mui/material"
import { Ember } from "../../../emberCommunication"
import { LocalStorage } from "../../../localStorage"
import { EMBER_IMPORTED_CHALLENGE_PATH } from "../../ImportedChallengeView"
import { EmberView } from "../../emberView/EmberView"
import { Header, HeaderText } from "../../header/Header"
import { SerializedChallenge } from "../../serializedChallenge"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { CreatorSubHeader } from "./EditorSubHeader/CreatorSubHeader"
import { NewChallengeButton } from "./ActionButtons/NewChallengeButton"
import { DownloadButton } from "./ActionButtons/DownloadButton"
import { CreatorActionButton } from "./ActionButtons/CreatorActionButton"
import EditIcon from '@mui/icons-material/Edit';

const TryModeSubHeader = ({challenge}: {challenge: SerializedChallenge}) =>
    <CreatorSubHeader>
        <HeaderText text={challenge.title}/>
        <Actions />
    </CreatorSubHeader>

const Actions = () => {
    const {t} = useTranslation('creator')

    return <Stack direction="row" alignItems={"center"}>
        <NewChallengeButton/>
        <Link to="/creador/editar">
            <CreatorActionButton startIcon={<EditIcon/>} backgroundColor="#449d99">{t("editor.buttons.keepEditing")}</CreatorActionButton>
        </Link>
        <DownloadButton/>
    </Stack>
}

export const CreatorTryMode = () => {
    const {t} = useTranslation('creator')

    const challengeBeingEdited: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    Ember.importChallenge(challengeBeingEdited)
    
    return <>
        <Header CenterComponent={<HeaderText text={t("editor.tryModeHeader")} />} SubHeader={<TryModeSubHeader challenge={challengeBeingEdited}/>}/>
        <EmberView path={EMBER_IMPORTED_CHALLENGE_PATH}/>
    </>
}