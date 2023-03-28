import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getChallenge, getPathToChallenge, PathToChallenge } from "../staticData/challenges";
import { EmberView } from "./EmberView";
import HomeIcon from '@mui/icons-material/Home';
import { Header } from "./header/Header";

const Breadcrumb = (path: PathToChallenge) => {

    return <>
        <Breadcrumbs>

            <Link to="/">
                <HomeIcon/> 
            </Link>
            
            <Link to={`/libros/${path.book.id}`}>
                <Typography>Ciclo {path.book.id}</Typography>
            </Link>
            
            <Typography>{path.chapter.id}</Typography>

            <Typography>{path.group.id}</Typography>

            <Typography>{path.challenge.id}</Typography>

        </Breadcrumbs>
    </>
}

export const ChallengeView = () =>{
    const {id} = useParams()
    const path: PathToChallenge = getPathToChallenge(Number(id))

    return <>
    <Header CenterComponent={Breadcrumb(path)}/>
    <EmberView path={`desafio/${id}`}/></>
}