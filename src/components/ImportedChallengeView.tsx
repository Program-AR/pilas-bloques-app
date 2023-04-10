import { useLocation } from "react-router-dom";
import { EmberView } from "./EmberView";
import { Header } from "./header/Header";
import { ImportedChallenge } from "./home/ImportChallengeButton";

export const ImportedChallengeView = () =>{
    const location = useLocation();
    const importedChallenge: ImportedChallenge | undefined = location.state;

    if (!importedChallenge) throw new Error("No hay desafio importado :(")

    return <>
    <Header CenterComponent={<p>{importedChallenge.title}</p>}/>
    <EmberView path={`desafio/react-imported-challenge`}/>
    </>
}