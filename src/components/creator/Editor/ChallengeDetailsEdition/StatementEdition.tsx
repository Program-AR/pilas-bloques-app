import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../../../localStorage";
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../../../modalDialog/GenericModalDialog";
import { DetailsEditionButton } from "./DetailsEditionButton";
import theme from "../../../../theme";
import { MarkdownInput } from "../MarkDownEdition/MarkdownInput";
import { MarkdownResult } from "../MarkDownEdition/MarkdownResult";

type StatementEditionType = {
    dialogImageUrl?: string;
    };

export const StatementEdition = (props: StatementEditionType) => {

    const { t } = useTranslation('creator');

    const initialStatement = LocalStorage.getCreatorChallenge()!.statement.description
    const initialClue = LocalStorage.getCreatorChallenge()!.statement.clue

    const [statement, setStatement] = useState<string>(initialStatement)
    const [clue, setClue] = useState<string | undefined>(initialClue)

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [showStatement, setShowStatement] = useState<boolean>(true)

    const handleOnConfirm = () => {
        const challenge = LocalStorage.getCreatorChallenge()
        challenge!.statement.description = statement
        challenge!.statement.clue = clue
        
        LocalStorage.saveCreatorChallenge(challenge)
        setDialogOpen(false)
    }

    const handleOnCancel = () => {
        setStatement(initialStatement)
        setClue(initialClue)

        setDialogOpen(false)
    }

    return <>
        <DetailsEditionButton
            imageurl="imagenes/boton_enunciado.png"
            text={t('statement.button')}
            onClick={() => setDialogOpen(true)}
            data-testid="statement-button" 
        />

        <GenericModalDialog
                        isOpen={dialogOpen}
                        dialogProps={{open: dialogOpen, fullWidth:true, maxWidth:"lg"}}
                        onConfirm={handleOnConfirm}
                        onCancel={handleOnCancel}
                        title={t('statement.title')}>
            <Box style={{ justifyContent:'center'}}>
            
            <MarkdownResult statement={statement} clue={clue} showStatement={showStatement}/>
            <Typography variant="body1" marginY={theme.spacing(2)}>{t('statement.descriptionHint')}</Typography>
            <MarkdownInput statement={statement} clue={clue} setStatement={setStatement} setClue={setClue} setShowStatement={setShowStatement}/>

            </Box>
        </GenericModalDialog>
    </>
}
