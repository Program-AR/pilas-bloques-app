import { Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Book, getBook } from "../../staticData/books";
import { Header } from "../header/Header";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PBreadcrumbs } from "../PBreadcrumbs";
import { Challenge } from "../../staticData/challenges";
import { Chapter } from "../../staticData/chapters";
import { Group } from "../../staticData/groups";
import { PBCard } from "../PBCard";
import { useThemeContext } from "../../theme/ThemeContext";

const Breadcrumb = (book: Book) => {    
    const {t} = useTranslation("books")


    return <PBreadcrumbs>

        <Link to="/">
            <HomeIcon style={{ display:'flex', color: '#787878'}}/> 
        </Link>
        
        <Typography>{t(`${book.id}.title`)}</Typography>

    </PBreadcrumbs>
}

export const BookView = () => {
    const {id} = useParams()
    const book: Book = getBook(Number(id))
    const {t} = useTranslation("books")
    const {theme} = useThemeContext()

    return <>
        <Header CenterComponent={Breadcrumb(book)}/>
        <Stack alignItems="center" style={{backgroundImage: "url(imagenes/book-background.svg)"}}>
            <PBCard style={{maxWidth: 'var(--creator-max-width)', padding: theme.spacing(2)}}>
                <Stack>
                    <Typography variant="h3">{t(`${book.id}.title`)}</Typography>
                    {book.chapters.map( chapter => <ChapterView chapter={chapter} key={chapter.id}/>)}
                </Stack>
            </PBCard>
        </Stack>
</>
}

const ChapterView = ({chapter}: {chapter: Chapter}) => {
    const {t} = useTranslation("chapters")
    const {theme} = useThemeContext()
    const Groups = () => <>{chapter.groups.map( group => <GroupView group={group} key={group.id} /> )}</>
    return <>
        <Divider sx={{margin: theme.spacing(1)}} variant="middle"/>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{t(`${chapter.id}.title`)}</Typography>
        {   // We stack in a row unitary groups (for intermediate and advanced books)
            chapter.groups[0].hasOnlyOneChallenge() ? 
                <Stack direction="row" flexWrap="wrap"><Groups/></Stack> : 
                <Groups/>
        }
    </> 
}

const GroupView = ({group}: {group: Group}) => {
    const {t} = useTranslation("groups")
    return <>
        {   // We don't show the title for unitary groups (for intermediate and advanced books)
            !group.hasOnlyOneChallenge() && <Typography variant="h6">{t(`${group.id}.title`)}</Typography>
        }
        <Stack direction="row" flexWrap="wrap">
            {group.challenges.map( challenge => <ChallengeCard key={challenge.id} challenge={challenge} /> ) }
        </Stack>
    </>
}
                            
const ChallengeCard = ({challenge}:{challenge: Challenge}) => {
    const {t} = useTranslation("challenges")
    const {theme} = useThemeContext()
    return <Link to={"/desafio/" + challenge.id}>
        <Stack width="120px">
            <PBCard><ChallengeCover challenge={challenge}/></PBCard>
            <Typography align="center" 
                style={{ marginLeft: theme.spacing(0.5), marginRight: theme.spacing(0.5), marginBottom: theme.spacing(2)}}>
                    {t(`${challenge.id}.title`)}
            </Typography>
        </Stack>
    </Link>
}

const ChallengeCover = ({challenge}: {challenge: Challenge}) => {
    const {theme} = useThemeContext()
    return <img 
        width="100%"
        style={{borderRadius: theme.shape.borderRadius}}
        alt="challenge" 
        src={`imagenes/challengeCovers/${challenge.id}.png`} 
    />
}