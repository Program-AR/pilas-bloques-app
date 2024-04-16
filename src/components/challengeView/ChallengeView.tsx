import { Link, useParams } from "react-router-dom"
import { PathToChallenge, currentIdFor, getChallengeWithId, getPathToChallenge } from "../../staticData/challenges";
import { Header } from "../header/Header";
import { ChallengeBreadcrumb } from "../ChallengeView";
import { Button, Stack, useMediaQuery } from "@mui/material";
import { StatementDescription } from "./StatementDescription";
import { Version } from "../footer/Footer";
import { EditableBlocklyWorkspace } from "./EditableBlocklyWorkspace";
import { SceneButtons } from "./SceneButtons";
import { SceneView } from "./SceneView";
import { useThemeContext } from "../../theme/ThemeContext";
import { PBCard } from "../PBCard";
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';


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
        <ChallengeFooter />
    </Stack>
}

const ChallengeWorkspace = ({ challengeId }: { challengeId: number }) => {
    const challenge = getChallengeWithId(challengeId)
    const { theme } = useThemeContext()

    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

    return <Stack flexGrow={1}>
        <StatementDescription
            text={"enunciado"}
            setShowStatement={() => { }}
            clueIsEnabled={true}
            urlImage={challenge.imageURL()} />
        <Stack direction="row" flexWrap={"wrap"} flexGrow={1}>
            <EditableBlocklyWorkspace />
            <Stack>
                <SceneButtons />
                <SceneView descriptor={challenge.sceneDescriptor} />
            </Stack>
        </Stack>
    </Stack>
}

const ChallengeFooter = () => {

    const PROGRAMAR_LINK = 'https://program.ar/'

    return <PBCard sx={{ marginBottom: '30px', padding: '0 15px' }}>
        <Stack direction={'row'} width={'100%'} alignItems='center' justifyContent={'space-between'}>
            <Stack direction={'row'} gap={2} >
                <Link to={PROGRAMAR_LINK} style={{ display: 'flex' }}>
                    <img src="imagenes/programar-short.png" style={{ alignSelf: 'center', maxWidth: "100%", height: '1.25rem' }} alt="logos" />
                </Link>
                <Version />
            </Stack>
            <Stack direction={'row'} gap={2}>
                <Button startIcon={<HelpIcon />}><b>¿ALGUN PROBLEMA CON ESTE EJERCICIO?</b></Button>
                <Button startIcon={<InfoIcon />}><b>ACERCA DE</b></Button>
            </Stack>
        </Stack>
    </PBCard>
}