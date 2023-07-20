import { useLocation } from "react-router-dom";
import { EmberView } from "./emberView/EmberView";
import { Header, HeaderText } from "./header/Header";
import { SerializedChallenge } from "./serializedChallenge";

export const EMBER_IMPORTED_CHALLENGE_PATH = "desafio/react-imported-challenge"


export const ImportedChallengeView = () =>{
    const location = useLocation();
    const importedChallenge: SerializedChallenge | undefined = location.state;

    if (!importedChallenge) throw new Error("No hay desafio importado :(")

    return <>
        <Header CenterComponent={<HeaderText text={importedChallenge.title}/>}/>
        <EmberView path={EMBER_IMPORTED_CHALLENGE_PATH}/>
    </>
}