import { HomeCard } from "./HomeCard";
import ImportImage from "../../assets/import.png"
import Button from '@mui/material/Button';
import { Ember } from "../../emberCommunication";
import { useNavigate } from "react-router-dom";

export type ImportedChallenge = any

export const ImportChallengeCard = () => {
    const navigate = useNavigate();

    const goToChallenge = (challenge: ImportedChallenge) => {
        Ember.importChallenge(challenge)
        navigate("/desafioImportado")
    }

    const readFile = async (event: any) => {
        const file: File = event.target.files[0]
        const content: string = await file.text()
        console.log(content)
        const challengeJson: any = JSON.parse(content)
        //Checkear si el desafio esta bien aca xd
        goToChallenge(challengeJson)
    }

    return (
    <Button component="label" style={{textTransform: 'none'}}>
        <HomeCard nameKey={"import"} image={ImportImage} color={"#fc3e5e"}/>
        <input hidden accept=".json" type="file" onChange={readFile}/>
    </Button>
)
}