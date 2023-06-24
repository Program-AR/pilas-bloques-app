import { Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
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

    return <Stack direction='row'>
        <Typography variant="h6" >{t('editor.title')}:</Typography>
        <div>
            {isEditing ? (
                <TextField
                    value={titleInProgress}
                    onChange={props => setTitleInProgress(props.target.value)}
                    onBlur={handleOnBlur}
                />) : (
                <div onClick={() => setIsEditing(true)}>
                    <Typography variant="h6">{currentTitle}</Typography>
                </div>
            )}

        </div>
    </Stack>

}
