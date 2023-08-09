import { Box } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../../../localStorage";
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../../../modalDialog/GenericModalDialog";
import { DetailsEditionButton } from "./DetailsEditionButton";
import { MarkdownEdition } from "../MarkDownEdition/MarkdownEditor";

type StatementEditionType = {
    dialogImageUrl?: string;
    };

export const StatementEdition = (props: StatementEditionType) => {

    const { t } = useTranslation('creator');

    const currentStatement = LocalStorage.getCreatorChallenge()!.statement.description
    const currentClue = LocalStorage.getCreatorChallenge()!.statement.clue

    const [statementInProgress, setStatementInProgress] = useState(currentStatement);
    const [clueInProgress, setClueInProgress] = useState(currentClue);
    const [clueCheck, setClueCheck] = useState(!!currentClue);
    const [markdownToShow, setMarkdownToShow] = useState(currentStatement);
    const [open, setOpen] = useState(false);

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        if(!open) {
            setStatementInProgress(currentStatement)
            setClueInProgress(currentClue)
            setClueCheck(!!currentClue)
            setOpen(true)
        }
    }    

    const handleOnCancel = () => {
        setOpen(false)
    }
    const handleOnConfirm = () => {
        let challenge = LocalStorage.getCreatorChallenge()
        challenge!.statement.description = statementInProgress
        challenge!.statement.clue = clueInProgress
        
        LocalStorage.saveCreatorChallenge(challenge)
        setOpen(false)
    }

    return <>
        <DetailsEditionButton
            imageurl="imagenes/boton_enunciado.png"
            text={t('statement.button')}
            onClick={handleButtonClick}
            data-testid="statement-button" 
        />

        <GenericModalDialog
                        isOpen={open}
                        dialogProps={{open:open, fullWidth:true, maxWidth:"lg"}}
                        onConfirm={handleOnConfirm}
                        onCancel={handleOnCancel}
                        title={t('statement.title')}>
            <Box style={{ justifyContent:'center'}}>
            <MarkdownEdition urlImage={`imagenes/sceneImages/${LocalStorage.getCreatorChallenge()!.scene.type}/tool.png`} 
                             markdownStatement={statementInProgress} 
                             setMarkdownStatement={(props => setStatementInProgress(props))}
                             clueCheck={clueCheck}
                             setMarkdownClueCheck={setClueCheck}
                             markdownClue={clueInProgress} 
                             setMarkdownClue={(props => setClueInProgress(props))}
                             markdownShow={markdownToShow} 
                             setMarkdownShow={setMarkdownToShow}
            />
            </Box>
        </GenericModalDialog>
    </>
}
