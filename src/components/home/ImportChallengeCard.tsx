import { CreatorCard } from './CreateChallengeCard';
import Button from '@mui/material/Button';
import { Ember } from "../../emberCommunication";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SerializedChallenge, isValidChallenge } from "../serializedChallenge";
import { DialogSnackbar } from "../dialogSnackbar/DialogSnackbar";
import UploadIcon from './UploadIcon';

export const ImportChallengeCard = () => {
    const { t } = useTranslation("home");
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const goToChallenge = (challenge: SerializedChallenge) => {
        Ember.importChallenge(challenge)
        navigate("/desafioImportado", {state: challenge})
    }

    const showErrorSnackbar = () => {
        setSnackbarOpen(true)
    }

    const readFile = async (event: any) => {
        const file: File = event.target.files[0]
        const content: string = await file.text()
        const challengeJson: unknown = JSON.parse(content)

        event.target.value = null // Without this Chrome seems to cache the file and prevents reruns of this function. 

        if (isValidChallenge(challengeJson)) {
            goToChallenge(challengeJson)
        }
        else {
            showErrorSnackbar()
        }

    }

    return <>
    <Button component="label" style={{textTransform: 'none', padding: 0}}>
        <CreatorCard visibleBadge={true} text={t("cards.import")} color={"#ffffff"} icon={UploadIcon}/>
        <input data-testid="import-input" hidden accept=".pbch,.json" type="file" onChange={readFile}/>
        <DialogSnackbar 
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)} 
            message={t('importError')}/>
    </Button>
</>
}