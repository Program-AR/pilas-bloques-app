import { Box, Switch, TextField, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../../../localStorage";
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../../../modalDialog/GenericModalDialog";
import { DetailsEditionButton } from "./DetailsEditionButton";

export const StatementEdition = () => {

    const { t } = useTranslation('creator');

    const currentStatement = LocalStorage.getCreatorChallenge()!.statement.description
    const currentClue = LocalStorage.getCreatorChallenge()!.statement.clue

    const [statementInProgress, setStatementInProgress] = useState(currentStatement);
    const [clueInProgress, setClueInProgress] = useState(currentClue);
    const [clueCheck, setClueCheck] = useState(!!currentClue);
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

    const handleClueOnChange = () => {
        if( clueCheck ) setClueInProgress('')
        setClueCheck(!clueCheck )
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
                        onConfirm={handleOnConfirm}
                        onCancel={handleOnCancel}
                        title={t('statement.title')}>
            <Box style={{ justifyContent:'center'}}>
            <Typography variant="body1">{t('statement.descriptionHint')}</Typography>
            <TextField
                fullWidth
                size="small"
                multiline={true}
                inputProps={{ "data-testid": "statement-input" }}
                label={t('statement.description')}
                value={statementInProgress}
                onChange={props => setStatementInProgress(props.target.value)}
                sx={{marginTop: '10px'}}
            />
            <br/>
            <FormControlLabel control={<Switch checked={clueCheck}
                                        onChange={handleClueOnChange}/>} label={t("statement.includeClue")} />
            
            <br/>
            <TextField
                fullWidth
                size="small"
                multiline={true}
                disabled={!clueCheck}
                label={t('statement.clue')}
                value={clueInProgress}
                onChange={props => setClueInProgress(props.target.value)}
            />
            </Box>
        </GenericModalDialog>
    </>
}
