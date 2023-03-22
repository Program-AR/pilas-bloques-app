import { useParams } from "react-router-dom";
import { getChallenge, getPathToChallenge, PathToChallenge } from "../staticData/challenges";
import { EmberView } from "./EmberView";

export const ChallengeView = () =>{
    const {id} = useParams()
    const challenge = getChallenge(Number(id))
    const path: PathToChallenge = getPathToChallenge(challenge)

    return <>
    <h1>Libro {path.book.id} -- {path.chapter.id} -- {path.group.id} -- Desafio {challenge.id}</h1>
    <EmberView path={`desafio/${id}`}/></>
}