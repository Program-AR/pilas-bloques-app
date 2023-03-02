import { useParams } from "react-router-dom";
import { EmberView } from "./EmberView";

export const ChallengeView = () =>{
    const {id} = useParams()

    return <EmberView path={`desafio/${id}`}/>
}