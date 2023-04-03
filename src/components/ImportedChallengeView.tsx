import { EmberView } from "./EmberView";
import { Header } from "./header/Header";

export const ImportedChallengeView = () =>{
    return <>
    <Header CenterComponent={<></>}/>
    <EmberView path={`desafio/react-imported-challenge`}/>
    </>
}