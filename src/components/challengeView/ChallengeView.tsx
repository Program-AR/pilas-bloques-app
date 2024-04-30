import { useParams } from "react-router-dom"
import { PathToChallenge, currentIdFor, getChallengeWithId, getPathToChallenge } from "../../staticData/challenges";
import { Header } from "../header/Header";
import { ChallengeBreadcrumb } from "../ChallengeView";
import { Drawer, Stack, useMediaQuery } from "@mui/material";
import { StatementDescription } from "./StatementDescription";
import { EditableBlocklyWorkspace } from "./EditableBlocklyWorkspace";
import { InfoButton, SceneButtons, SceneButtonsVertical } from "./SceneButtons/SceneButtons";
import { SceneView } from "./SceneView";
import { useThemeContext } from "../../theme/ThemeContext";
import { ChallengeFooter } from "./Info/ChallengeFooter";
import { useState } from "react";



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
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)

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
            : <Stack flexGrow={1} direction='column' height='100%'>
                <StatementDescription
                    text={"enunciado"}
                    setShowStatement={() => { }}
                    clueIsEnabled={true}
                    urlImage={challenge.imageURL()} />
                <Stack flexWrap={"wrap"} flexGrow={1} >
                    <EditableBlocklyWorkspace isVertical={true} />
                    <Stack direction='row' marginBottom='5px' justifyContent='space-evenly'>
                        <SceneView descriptor={challenge.sceneDescriptor} />
                        <Stack margin='10px' justifyContent='space-between'>
                            <SceneButtonsVertical />
                            <InfoButton onClick={() => setOpenDrawer(true)} />
                            <InfoDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        }
    </>
}


type InfoDrawerProps = {
    open: boolean
    onClose: () => void
}

const InfoDrawer = ({ open, onClose }: InfoDrawerProps) => {
    return <Drawer
        PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none', justifyContent: 'flex-end' } }}
        anchor='right'
        onClose={onClose}
        open={open}>
        <ChallengeFooter isVertical={true} />
    </Drawer>
}