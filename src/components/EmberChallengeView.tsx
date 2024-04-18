import { useParams, useSearchParams } from "react-router-dom";
import { Challenge, currentIdFor, getChallengeWithName, getPathToChallenge, PathToChallenge } from "../staticData/challenges";
import { EmberView } from "./emberView/EmberView";
import { Header } from "./header/Header";
import { ChallengeBreadcrumb } from "./challengeView/ChallengeView";

type EmberChallengeViewProps = {
    challengeId: number
}

const EmberChallengeView = (props: EmberChallengeViewProps) => {
    const [searchParams] = useSearchParams();
    const solution: string | null = searchParams.get("codigo")

    const path: PathToChallenge = getPathToChallenge(props.challengeId)

    const solutionParam: string = solution ? `?codigo=${solution}` : ""

    return <>
        <Header CenterComponent={ChallengeBreadcrumb(path)} shouldShowSimpleReadSwitch={!path.book.simpleReadMode} />
        <EmberView path={`desafio/${props.challengeId}${solutionParam}`} />
    </>
}


export const ChallengeById = () => {
    var { id } = useParams()
    return <EmberChallengeView challengeId={currentIdFor(Number(id))} />
}

export const ChallengeByName = () => {
    const { challengeName } = useParams()

    const challenge: Challenge = getChallengeWithName(challengeName!)

    return <EmberChallengeView challengeId={challenge.id} />
}