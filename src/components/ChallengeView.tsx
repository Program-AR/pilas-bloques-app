import { Stack, Typography, useMediaQuery } from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Challenge, getChallengeWithName, getPathToChallenge, PathToChallenge } from "../staticData/challenges";
import { EmberView } from "./emberView/EmberView";
import HomeIcon from '@mui/icons-material/Home';
import { Header } from "./header/Header";
import { useTranslation } from "react-i18next";
import { PBreadcrumbs } from "./PBreadcrumbs";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButtonTooltip } from "./creator/Editor/SceneEdition/IconButtonTooltip";

const ChallengeBreadcrumb = (path: PathToChallenge) => {

    const { t } = useTranslation(["books", "challenges", "chapters", "groups"])
    const isSmallScreen: boolean = useMediaQuery('(max-width:1100px)');
    const isVerySmallScreen: boolean = useMediaQuery('(max-width:700px)');

    const shouldShowGroup = path.book.id === 1 && !isVerySmallScreen
    const shouldShowChapter = !isSmallScreen

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
        <IconButtonTooltip onClick={() => {}} icon={<SkipPreviousIcon />} tooltip={"Desafío anterior"} />
        <IconButtonTooltip onClick={() => {}} icon={<SkipNextIcon />} tooltip={"Desafío siguiente"} />
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
        <Header CenterComponent={ChallengeBreadcrumb(path)} />
        <EmberView path={`desafio/${props.challengeId}${solutionParam}`} />
    </>
}


export const ChallengeById = () => {
    const { id } = useParams()
    return <ChallengeView challengeId={Number(id)}/>
}

export const ChallengeByName = () => {
    const { challengeName } = useParams()

    const challenge: Challenge = getChallengeWithName(challengeName!)

    return <ChallengeView challengeId={challenge.id} />
}