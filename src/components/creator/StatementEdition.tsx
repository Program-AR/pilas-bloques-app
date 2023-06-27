import { Button, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../localStorage";
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../modalDialog/GenericModalDialog";

export const StatementEdition = () => {

    const { t } = useTranslation('creator');

    const currentStatement = LocalStorage.getCreatorChallenge()!.statement.description
    const currentClue = LocalStorage.getCreatorChallenge()!.statement.clue

    const [statementInProgress, setStatementInProgress] = useState(currentStatement);
    const [clueInProgress, setClueInProgress] = useState(currentClue);
    const [clueCheck, setClueCheck] = useState(currentClue !== '');
    const [open, setOpen] = useState(false);

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        if(!open) setOpen(true)
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
        <Button data-testid="statement-button" onClick={handleButtonClick}>{t('statement.title')}</Button>
        <GenericModalDialog
                        isOpen={open}
                        onConfirm={handleOnConfirm}
                        onCancel={handleOnCancel}
                        title={t('statement.title')}>
            <>
            <TextField
                sx={{ margin: "6px", width: { sm: 200, md: 500 } }}
                size="small"
                multiline={true}
                inputProps={{ "data-testid": "statement-input" }}
                label={t('statement.description')}
                value={statementInProgress}
                onChange={props => setStatementInProgress(props.target.value)}
            />
            <br/>
            <Switch checked={clueCheck}
                    onChange={handleClueOnChange}/>
            <br/>
            <TextField
                sx={{ margin: "6px", width: { sm: 200, md: 500 }}}
                size="small"
                multiline={true}
                disabled={!clueCheck}
                label={t('statement.clue')}
                value={clueInProgress}
                onChange={props => setClueInProgress(props.target.value)}
            />
            </>
        </GenericModalDialog>
    </>
}
