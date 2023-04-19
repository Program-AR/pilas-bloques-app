import { HomeCard } from "./HomeCard";
import ImportImage from "../../assets/import.png"
import Button from '@mui/material/Button';
import { Ember } from "../../emberCommunication";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SerializedChallenge, isValidChallenge } from "../serializedChallenge";

export const ImportChallengeCard = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const goToChallenge = (challenge: SerializedChallenge) => {
        Ember.importChallenge(challenge)
        navigate("/desafioImportado", {state: challenge})
    }

    const showErrorModal = () => {
        setModalOpen(true)
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
            showErrorModal()
        }

    }

    return (
    <Button component="label" style={{textTransform: 'none'}}>
        <HomeCard nameKey={"import"} image={ImportImage} color={"#fc3e5e"}/>
        <input id="import-input" hidden accept=".pbch,.json" type="file" onChange={readFile}/>
        <Modal data-testid="invalid-import-modal" open={modalOpen} onClose={() => {setModalOpen(false)}} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage />
        </Modal>
    </Button>
)
}

const ErrorMessage = () => {
    const { t } = useTranslation("home/home");

    return <Paper elevation={24} sx={{maxWidth: "25%", maxHeight: "25%" , display: "flex", alignItems: "center"}}>
        <Typography textAlign='center'>{t("importError")}</Typography>
        <img src={ImportImage}/>
    </Paper>
}