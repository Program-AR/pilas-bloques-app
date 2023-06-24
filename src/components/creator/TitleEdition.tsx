import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../localStorage";
import { useTranslation } from "react-i18next";

export const TitleEdition = () => {

    const { t } = useTranslation('creator');

    const [isEditing, setIsEditing] = useState(false);
    const [titleInProgress, setTitleInProgress] = useState('');

    const currentTitle = LocalStorage.getCreatorChallenge()?.title

    const handleOnBlur = () => {
        let challenge = LocalStorage.getCreatorChallenge()

        challenge!.title = titleInProgress
        LocalStorage.saveCreatorChallenge(challenge)

        setIsEditing(false)
    }

    return <Stack direction='row' style={{borderStyle: "solid", justifyContent:"space-between"}}>
        <Typography variant="h6">{t('editor.title')}: </Typography>
        <div style={{width: "600px"}}>
            {isEditing ? (
                <TextField
                    style={{width: "100%"}}
                    value={titleInProgress}
                    onChange={props => setTitleInProgress(props.target.value)}
                    onBlur={handleOnBlur}
                />) : (
                <div onClick={() => setIsEditing(true)} style={{height: "100%"}}>
                    <Typography variant="h6">{currentTitle}</Typography>
                </div>
            )}

        </div>
    </Stack>

}
