import { HomeCard } from "./HomeCard";
import ImportImage from "../../assets/import.png"
import Button from '@mui/material/Button';
import { Ember } from "../../emberCommunication";
import { useNavigate } from "react-router-dom";
import simpleTypeGuard, { SimpleArray, SimpleNumber, SimpleString } from 'simple-type-guard';
import { useState } from "react";
import { Modal } from "@mui/material";

export type ImportedChallenge = {
    version: number,
    name: string,
    scene: string,
    blocks: string[],
    toolboxStyle: string
}

export const ImportChallengeCard = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const goToChallenge = (challenge: ImportedChallenge) => {
        Ember.importChallenge(challenge)
        navigate("/desafioImportado")
    }

    const showErrorModal = () => {
        setModalOpen(true)
    }

    const isValidChallenge = (json: unknown): boolean => 
        simpleTypeGuard<ImportedChallenge>(json, {
            version: SimpleNumber, 
            name: SimpleString, 
            scene: SimpleString, 
            blocks: new SimpleArray(SimpleString),
            toolboxStyle: SimpleString
        })

    const readFile = async (event: any) => {
        const file: File = event.target.files[0]
        const content: string = await file.text()
        const challengeJson: unknown = JSON.parse(content)

        event.target.value = null // Without this Chrome seems to cache the file and prevents reruns of this function. 

        if (isValidChallenge(challengeJson)) {
            goToChallenge(challengeJson as ImportedChallenge)
        }
        else {
            showErrorModal()
        }

    }

    return (
    <Button component="label" style={{textTransform: 'none'}}>
        <HomeCard nameKey={"import"} image={ImportImage} color={"#fc3e5e"}/>
        <input hidden accept=".pbch,.json" type="file" onChange={readFile}/>
        <Modal open={modalOpen} onClose={() => {setModalOpen(false)}}>
            <img src={ImportImage}/>
        </Modal>
    </Button>
)
}
