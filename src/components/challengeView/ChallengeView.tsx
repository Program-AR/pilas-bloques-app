import { useParams } from "react-router-dom"
import { PathToChallenge, currentIdFor, getPathToChallenge } from "../../staticData/challenges";
import { Header } from "../header/Header";
import { ChallengeBreadcrumb } from "../ChallengeView";
import { Stack } from "@mui/material";
import { StatementDescription } from "./StatementDescription";
import { Footer } from "../footer/Footer";
import { BlocksWorkspace } from "./BlocksWorkspace";
import { SceneButtons } from "./SceneButtons";
import { Scene } from "./Scene";

export const ChallengeView = () => {
    var { id } = useParams()
    const challengeId = currentIdFor(Number(id))
    
    const path: PathToChallenge = getPathToChallenge(challengeId)
    
    //const [searchParams] = useSearchParams();
    //const solution: string | null = searchParams.get("codigo")
    //const solutionParam: string = solution ? `?codigo=${solution}` : ""

    return <>
        <Header CenterComponent={ChallengeBreadcrumb(path)} shouldShowSimpleReadSwitch={!path.book.simpleReadMode} />
        <ChallengeWorkspace challengeId={challengeId} />
    </>
}

const ChallengeWorkspace = ({challengeId}: {challengeId: number}) => {
    return <Stack>
        <StatementDescription  text={"enunciado"} setShowStatement={() => {}} clueIsEnabled={true} />
        <Stack direction="row" flexWrap={"wrap"}>
            <BlocksWorkspace/>
            <Stack>
                <SceneButtons/>
                <Scene/>
            </Stack>
        </Stack>
        <Footer />
    </Stack>
}