import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Book, getBook } from "../../staticData/books";
import { Header } from "../header/Header";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PBreadcrumbs } from "../PBreadcrumbs";
import { Challenge } from "../../staticData/challenges";

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

    return <>
        <Header CenterComponent={Breadcrumb(book)}/>
        <ChallengeList book={book} />
</>
}

const ChallengeList = ({book}: {book: Book}) => {
    const {t} = useTranslation("books")
    return <Stack>
        <Typography variant="h1">{t(`${book.id}.title`)}</Typography>
        {book.chapters.map( chapter => <Stack key={chapter.id}>
            <Typography variant="h2">{t(`chapters.${chapter.id}.title`)}</Typography>
            {chapter.groups.map( group => {
                var groupTitle = t(`groups.${group.id}.title`)
                return <Stack key={group.id}>
                    {groupTitle && <Typography variant="h3">{groupTitle}</Typography>}
                    <Stack direction="row">
                        {group.challenges.map( challenge => 
                            <ChallengeCard key={challenge.id} challenge={challenge} />
                        )}
                    </Stack>
                </Stack>
            })}
        </Stack>)}
    </Stack>
}

const ChallengeCard = ({challenge}:{challenge: Challenge}) => {
    const {t} = useTranslation("challenges")
    return <Typography>{t(`${challenge.id}.title`)}</Typography>
}