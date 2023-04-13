import { Breadcrumbs, Typography, useMediaQuery } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getPathToChallenge, PathToChallenge } from "../staticData/challenges";
import { EmberView } from "./EmberView";
import HomeIcon from '@mui/icons-material/Home';
import { Header } from "./header/Header";
import { useTranslation } from "react-i18next";

const Breadcrumb = (path: PathToChallenge) => {
    const {t} = useTranslation(["books", "challenges", "chapters", "groups"])
    const isSmallScreen: boolean = useMediaQuery('(max-width:1100px)');
    const isVerySmallScreen: boolean = useMediaQuery('(max-width:700px)');

    const shouldShowGroup = path.book.id === 1 && !isVerySmallScreen
    const shouldShowChapter = !isSmallScreen

    return <>
        <Breadcrumbs separator=">" >

            <Link to="/">
                <HomeIcon style={{ display:'flex', color: '#787878'}}/> 

            </Link>
            
            <Link to={`/libros/${path.book.id}`}>
                <Typography>{t(`${path.book.id}.title`, {ns: "books"})}</Typography>
            </Link>

            {shouldShowChapter && 
                <Typography>{t(`${path.chapter.id}.title`, {ns: "chapters"})}</Typography>
            }

            {shouldShowGroup &&
                <Typography>{t(`${path.group.id}.title`, {ns: "groups"})}</Typography>
            }

            <Typography>{t(`${path.challenge.id}.title`, {ns: "challenges"})}</Typography>

        </Breadcrumbs>
    </>
}

export const ChallengeView = () =>{
    const {id} = useParams()
    const path: PathToChallenge = getPathToChallenge(Number(id))

    return <>
    <Header CenterComponent={Breadcrumb(path)}/>
    <EmberView path={`desafio/${id}`}/>
    </>
}