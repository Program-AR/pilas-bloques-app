import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getPathToChallenge, PathToChallenge } from "../staticData/challenges";
import { EmberView } from "./EmberView";
import HomeIcon from '@mui/icons-material/Home';
import { Header } from "./header/Header";
import { useTranslation } from "react-i18next";

const Breadcrumb = (path: PathToChallenge) => {
    const {t} = useTranslation(["books", "challenges", "chapters", "groups"])

    const shouldShowGroup: boolean = path.book.id === 1

    return <>
        <Breadcrumbs separator=">">

            <Link to="/">
                <HomeIcon/> 
            </Link>
            
            <Link to={`/libros/${path.book.id}`}>
                <Typography>{t(`${path.book.id}.title`, {ns: "books"})}</Typography>
            </Link>
            
            <Typography>{t(`${path.chapter.id}.title`, {ns: "chapters"})}</Typography>

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