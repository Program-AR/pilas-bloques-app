import { TextField } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../../localStorage";
import { useTranslation } from "react-i18next";

export const TitleEdition = () => {

    const { t } = useTranslation('creator');

    const currentTitle = LocalStorage.getCreatorChallenge()!.title
    const [titleInProgress, setTitleInProgress] = useState(currentTitle);

    const handleOnBlur = () => {
        let challenge = LocalStorage.getCreatorChallenge()

        challenge!.title = titleInProgress
        LocalStorage.saveCreatorChallenge(challenge)
    }

    return <TextField
        sx={{ margin: "6px" }}
        size="small"
        label={t('editor.title')}
        value={titleInProgress}
        onChange={props => setTitleInProgress(props.target.value)}
        onBlur={handleOnBlur}
    />
}
