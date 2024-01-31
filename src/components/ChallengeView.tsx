import { Stack, Typography, useMediaQuery } from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Challenge, currentIdFor, getChallengeWithName, getPathToChallenge, PathToChallenge } from "../staticData/challenges";
import { EmberView } from "./emberView/EmberView";
import HomeIcon from '@mui/icons-material/Home';
import { Header } from "./header/Header";
import { useTranslation } from "react-i18next";
import { PBreadcrumbs } from "./PBreadcrumbs";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IconButtonTooltip } from "./creator/Editor/SceneEdition/IconButtonTooltip";
import { useThemeContext } from "../theme/ThemeContext";


const ChallengeBreadcrumb = (path: PathToChallenge) => {

    const { t } = useTranslation(["books", "challenges", "chapters", "groups", "others"])
    const {theme} = useThemeContext()
    const isSmallScreen: boolean = useMediaQuery('(max-width:1100px)');
    const isVerySmallScreen: boolean = useMediaQuery('(max-width:700px)');

    const shouldShowGroup = path.book.id === 1 && !isVerySmallScreen
    const shouldShowChapter = !isSmallScreen
    const hasPrevChallenge = path.group.previousChallenge(path.challenge) 
    const hasNextChallenge = path.group.nextChallenge(path.challenge) 

    return <Stack direction="row" alignItems="center">
        <PBreadcrumbs>

            <Link to="/">
                <HomeIcon style={{ display: 'flex', color: '#787878' }} />

            </Link>

            <Link to={`/libros/${path.book.id}`}>
                <Typography>{t(`${path.book.id}.title`, { ns: "books" })}</Typography>
            </Link>

            {shouldShowChapter &&
                <Typography>{t(`${path.chapter.id}.title`, { ns: "chapters" })}</Typography>
            }

            {shouldShowGroup &&
                <Typography>{t(`${path.group.id}.title`, { ns: "groups" })}</Typography>
            }

            <Typography>{t(`${path.challenge.id}.title`, { ns: "challenges" })}</Typography>

        </PBreadcrumbs>
        <Stack marginLeft={theme.spacing(5)} direction='row'>
            {hasPrevChallenge && 
                <Link to={`/desafio/${hasPrevChallenge!.id}`}>
                    <IconButtonTooltip icon={<KeyboardDoubleArrowLeftIcon />} tooltip={t('previousChallenge', { ns: "others" })} />
                </Link>
            }
            {hasNextChallenge && 
                <Link to={`/desafio/${hasNextChallenge!.id}`}>
                    <IconButtonTooltip icon={<KeyboardDoubleArrowRightIcon />} tooltip={t('nextChallenge', { ns: "others" })} />
                </Link>
            }
        </Stack>
    </Stack>
}

type ChallengeViewProps = {
    challengeId: number
}

const ChallengeView = (props: ChallengeViewProps) => {
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
    return <ChallengeView challengeId={currentIdFor(Number(id))} />
}

export const ChallengeByName = () => {
    const { challengeName } = useParams()

    const challenge: Challenge = getChallengeWithName(challengeName!)

    return <ChallengeView challengeId={challenge.id} />
}