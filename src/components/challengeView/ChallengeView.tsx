import { useParams } from "react-router-dom"
import { PathToChallenge, currentIdFor, getChallengeWithId, getPathToChallenge } from "../../staticData/challenges";
import { Header } from "../header/Header";
import { ChallengeBreadcrumb } from "../ChallengeView";
import { Stack, useMediaQuery } from "@mui/material";
import { StatementDescription } from "./StatementDescription";
import { EditableBlocklyWorkspace } from "./EditableBlocklyWorkspace";
import { SceneButtons, SceneButtonsVertical } from "./SceneButtons";
import { SceneView } from "./SceneView";
import { useThemeContext } from "../../theme/ThemeContext";
import { ChallengeFooter } from "./ChallengeFooter";
import { PBBlocklyWorkspace } from "../blockly/PBBlocklyWorkspace";



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

const ChallengeWorkspace = ({ challengeId }: { challengeId: number }) => {
    const challenge = getChallengeWithId(challengeId)
    const { theme } = useThemeContext()

    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

    return <>
        {!isSmallScreen ? <>
            <Stack flexGrow={1}>
                <StatementDescription
                    text={"enunciado"}
                    setShowStatement={() => { }}
                    clueIsEnabled={true}
                    urlImage={challenge.imageURL()} />
                <Stack direction="row" flexWrap={"wrap"} flexGrow={1}>
                    <EditableBlocklyWorkspace isVertical={false} />
                    <Stack>
                        <SceneButtons />
                        <SceneView descriptor={challenge.sceneDescriptor} />
                    </Stack>
                </Stack>
            </Stack>
            <ChallengeFooter />
        </>
            : <Stack direction='column'>
                <StatementDescription
                    text={"enunciado"}
                    setShowStatement={() => { }}
                    clueIsEnabled={true}
                    urlImage={challenge.imageURL()} />
                <Stack flexWrap={"wrap"} flexGrow={1} height='85vh'>
                    <EditableBlocklyWorkspace isVertical={true} />
                    <Stack direction='row' height='40vh' justifyContent='space-around'>
                        <SceneView descriptor={challenge.sceneDescriptor} />
                        <SceneButtonsVertical />
                    </Stack>
                </Stack>
            </Stack>

        }
    </>
}


//
