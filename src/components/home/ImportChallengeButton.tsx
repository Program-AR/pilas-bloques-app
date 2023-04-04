import { HomeCard } from "./HomeCard";
import ImportImage from "../../assets/import.png"
import Button from '@mui/material/Button';
import { Ember } from "../../emberCommunication";
import { useNavigate } from "react-router-dom";
import simpleTypeGuard, { SimpleArray, SimpleNumber, SimpleString } from 'simple-type-guard';

export type ImportedChallenge = {
    version: number,
    nombre: string,
    escena: string,
    bloques: string[]
}


const isValidChallenge = (json: unknown): boolean => 
    simpleTypeGuard<ImportedChallenge>(json, {
        version: SimpleNumber, 
        nombre: SimpleString, 
        escena: SimpleString, 
        bloques: new SimpleArray(SimpleString)
    })


export const ImportChallengeCard = () => {
    const navigate = useNavigate();

    const goToChallenge = (challenge: ImportedChallenge) => {
        Ember.importChallenge(challenge)
        navigate("/desafioImportado")
    }

    const getChallengeFromFile = async (file: File): Promise<ImportedChallenge> => {
        const content: string = await file.text()
        const challengeJson: unknown = JSON.parse(content)

        if(!isValidChallenge(challengeJson)) throw Error("Invalid challenge")

        return challengeJson as ImportedChallenge

    }

    const readFile = async (event: any) => {
        const file: File = event.target.files[0]
        const challenge: ImportedChallenge = await getChallengeFromFile(file)
        goToChallenge(challenge)
    }

    return (
    <Button component="label" style={{textTransform: 'none'}}>
        <HomeCard nameKey={"import"} image={ImportImage} color={"#fc3e5e"}/>
        <input hidden accept=".json" type="file" onChange={readFile}/>
    </Button>
)
}
