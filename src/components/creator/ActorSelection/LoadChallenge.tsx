import { Button, darken, Tooltip, useMediaQuery } from "@mui/material"
import UploadIcon from '../../home/UploadIcon';
import { LocalStorage } from "../../../localStorage"
import { SerializedChallenge, isValidChallenge } from "../../serializedChallenge"
import { DialogSnackbar } from "../../dialogSnackbar/DialogSnackbar";
import { useState } from "react"
import { useTranslation } from "react-i18next"
import theme from "../../../theme"
import { useNavigate } from "react-router-dom"

export const LoadChallengeButton = () => {
	const { t } = useTranslation("creator")
    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));
	const navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = useState(false);

	const goToCreatorChallenge = (challenge: SerializedChallenge) => {
		LocalStorage.saveCreatorChallenge(challenge)
		navigate("/creador/editar")
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
            goToCreatorChallenge(challengeJson)
        }
        else {
            showErrorSnackbar()
        }
    }
    
	return (
        <Tooltip title={isSmallScreen ? t(`editor.buttons.loadChallenge`) : ''}>
            <Button variant="outlined" sx={{
                textTransform: "none",
                marginRight: '10px',
                whiteSpace: 'nowrap',
                backgroundColor: '#ffffff', 
                fontWeight: 'bold', 
                fontSize: 16,
                    '&:hover': {
                        backgroundColor: darken('#ffffff', 0.2),
                    } }}
                component="label"
                startIcon={<UploadIcon />}>
                {t(`editor.buttons.loadChallenge${isSmallScreen ? 'Short' : ''}`)}
                <input data-testid="import-input" hidden accept=".dpbq" type="file" onChange={readFile} />
                <DialogSnackbar
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                    message={t('selection.importError')} /> 
            </Button>            
        </Tooltip>
	)
}

