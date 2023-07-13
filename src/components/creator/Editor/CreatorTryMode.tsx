import { Button, Grid } from "@mui/material"
import { Ember } from "../../../emberCommunication"
import { LocalStorage } from "../../../localStorage"
import { EMBER_IMPORTED_CHALLENGE_PATH } from "../../ImportedChallengeView"
import { EmberView } from "../../emberView/EmberView"
import { Header, HeaderText } from "../../header/Header"
import { DownloadButton } from "./DownloadButton"
import { SerializedChallenge } from "../../serializedChallenge"

const HeaderContent = (challenge: SerializedChallenge) => <>
    <HeaderText text={challenge.title}/>
    <Grid>
        <Button>Nuevo desafio</Button>
        <Button>Seguir editando</Button>
        <DownloadButton/>
    </Grid>
</>

export const CreatorTryMode = () => {

    const challengeBeingEdited: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    Ember.importChallenge(challengeBeingEdited)
    
    return <>
        <Header CenterComponent={HeaderContent(challengeBeingEdited)}/>
        <EmberView path={EMBER_IMPORTED_CHALLENGE_PATH}/>
    </>
}