import { Typography } from "@mui/material"
import { Ember } from "../../../emberCommunication"
import { EmberView } from "../../emberView/EmberView"
import { LocalStorage } from "../../../localStorage"
import { EMBER_IMPORTED_CHALLENGE_PATH } from "../../ImportedChallengeView"
import { Header, HeaderText } from "../../header/Header"
import { SerializedChallenge } from "../../serializedChallenge"
import { useTranslation } from "react-i18next"
import { ReturnToEditionButton } from "./ActionButtons/ReturnToEditButton"
import { BetaBadge } from "../BetaBadge"
import { PBreadcrumbs } from "../../PBreadcrumbs"
import { EditorSubHeader } from "./Editor"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChallengeView } from "../../challengeView/ChallengeView"

export const EmberCreatorViewMode = () => {

    const challengeBeingEdited: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    Ember.importChallenge(challengeBeingEdited)

    const navigate = useNavigate()

    const challengeExists = LocalStorage.getCreatorChallenge()

    useEffect(() => {
        if (!challengeExists) navigate('/creador/seleccionar')
    }, [challengeExists, navigate])

    return (<>
        {challengeExists ? (
            <>
                <Header CenterComponent={<EmberCreatorViewHeader title={challengeBeingEdited.title} />} SubHeader={<EditorSubHeader viewButton={<ReturnToEditionButton />} />} />
                <EmberView height='calc(100% - var(--creator-subheader-height))' path={EMBER_IMPORTED_CHALLENGE_PATH} />
                
            </>
        ) : <></>}
    </>)
}

export const EmberCreatorViewHeader = ({ title }: { title: string }) => {
    const { t } = useTranslation('creator')

    return <BetaBadge smaller={true}>
        <PBreadcrumbs>
            <HeaderText text={t("editor.previewModeHeader")} />
            <Typography>{title}</Typography>
        </PBreadcrumbs>
    </BetaBadge>

}