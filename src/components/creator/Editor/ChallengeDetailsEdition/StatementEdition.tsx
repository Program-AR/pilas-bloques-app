import { Box } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../../../localStorage";
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../../../modalDialog/GenericModalDialog";
import { DetailsEditionButton } from "./DetailsEditionButton";
import { MarkdownEditor } from "../MarkDownEdition/MarkdownEditor";

type StatementEditionType = {
    dialogImageUrl?: string;
    };

export const StatementEdition = (props: StatementEditionType) => {

    const { t } = useTranslation('creator');

    const initialStatement: string = LocalStorage.getCreatorChallenge()!.statement.description
    const initialClue = LocalStorage.getCreatorChallenge()!.statement.clue
    const actor = LocalStorage.getCreatorChallenge()!.scene.type

    const [statement, setStatement] = useState<string>(initialStatement)
    const [clue, setClue] = useState<string | undefined>(initialClue)

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

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
                        isDraggable
                        title={`${t('statement.title')}${actor}`}>
            <Box style={{ justifyContent:'center'}}>
            
            <MarkdownEditor statement={statement} clue={clue} setStatement={setStatement} setClue={setClue} />

            </Box>
        </GenericModalDialog>
    </>
}
