import { Button, Box, Switch, TextField, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../localStorage";
import DescriptionIcon from '@mui/icons-material/Description';
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../modalDialog/GenericModalDialog";

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
        <Button 
            variant="outlined" 
            size="large"
            style={{margin:"6px", textTransform:"none"}} 
            startIcon={<DescriptionIcon />}
            data-testid="statement-button" 
            onClick={handleButtonClick}>{t('statement.button')}</Button>
        <GenericModalDialog
                        isOpen={open}
                        onConfirm={handleOnConfirm}
                        onCancel={handleOnCancel}
                        title={t('statement.title')}>
            <Box style={{justifyContent:'center'}}>
            <Typography variant="caption">{t('statement.descriptionHint')}</Typography>
            <TextField
                fullWidth
                size="small"
                multiline={true}
                inputProps={{ "data-testid": "statement-input" }}
                label={t('statement.description')}
                value={statementInProgress}
                onChange={props => setStatementInProgress(props.target.value)}
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
