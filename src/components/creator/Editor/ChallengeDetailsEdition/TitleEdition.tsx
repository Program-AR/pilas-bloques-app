import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../../../localStorage";
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../../../modalDialog/GenericModalDialog";
import { DetailsEditionButton } from "./DetailsEditionButton";


export const TitleEdition = () => {

    const { t } = useTranslation('creator');

    const initialTitle = LocalStorage.getCreatorChallenge()!.title
    const actor = LocalStorage.getCreatorChallenge()!.scene.type
    
    const [titleInProgress, setTitleInProgress] = useState<string>(initialTitle);
    
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const handleOnConfirm = () => {
        let challenge = LocalStorage.getCreatorChallenge()
        challenge!.title = titleInProgress
        LocalStorage.saveCreatorChallenge(challenge)
        setDialogOpen(false)
    }

    const handleOnCancel = () => {
        setTitleInProgress(initialTitle)
        setDialogOpen(false)
    }

    return <>
        <DetailsEditionButton
            imageurl="imagenes/boton_titulo.png"
            text={t('title.button')}
            onClick={() => setDialogOpen(true)}
            data-testid="title-button" 
        />

        <GenericModalDialog
                        isOpen={dialogOpen}
                        dialogProps={{open: dialogOpen}}
                        onConfirm={handleOnConfirm}
                        onCancel={handleOnCancel}
                        title={`${t('title.title')}${actor}`}>
            <Box style={{ justifyContent:'center'}}>
            

            <TextField
                sx={{ width: "350px", margin: '0 10px' }}
                variant="standard"
                label={t('title.input')}
                value={titleInProgress}
                onChange={props => setTitleInProgress(props.target.value)}
                inputProps={{maxLength: 38}}
            />            
            </Box>
        </GenericModalDialog>
    </>
}
