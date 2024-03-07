import { useParams } from "react-router-dom"
import { PathToChallenge, currentIdFor, getChallengeWithId, getPathToChallenge } from "../../staticData/challenges";
import { Header } from "../header/Header";
import { ChallengeBreadcrumb } from "../ChallengeView";
import { Stack } from "@mui/material";
import { StatementDescription } from "./StatementDescription";
import { Footer } from "../footer/Footer";
import { BlocksWorkspace } from "./BlocksWorkspace";
import { SceneButtons } from "./SceneButtons";
import { SceneView } from "./SceneView";

// Repeats code with components/ChallengeView.ts, should replace it eventually.
export const ChallengeView = () => {
    var { id } = useParams()
    const challengeId = currentIdFor(Number(id))
    
    const path: PathToChallenge = getPathToChallenge(challengeId)
    
    //const [searchParams] = useSearchParams();
    //const solution: string | null = searchParams.get("codigo")
    //const solutionParam: string = solution ? `?codigo=${solution}` : ""

    return <Stack height="100%">
        <Header CenterComponent={ChallengeBreadcrumb(path)} shouldShowSimpleReadSwitch={!path.book.simpleReadMode} />
        <ChallengeWorkspace challengeId={challengeId} />
    </Stack>
}

const ChallengeWorkspace = ({challengeId}: {challengeId: number}) => {
    const challenge = getChallengeWithId(challengeId)

    return <Stack flexGrow={1}>
        <StatementDescription
            text={"enunciado"}
            setShowStatement={() => {}}
            clueIsEnabled={true}
            urlImage={challenge.imageURL()} />
        <Stack direction="row" flexWrap={"wrap"} flexGrow={1}>
            <BlocksWorkspace/>
            <Stack>
                <SceneButtons/>
                <SceneView descriptor={challenge.sceneDescriptor}/>
            </Stack>
        </Stack>
        <Footer />
    </Stack>
}