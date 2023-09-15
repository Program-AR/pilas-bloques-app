import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Book, getBook } from "../../staticData/books";
import { EmberView } from "../emberView/EmberView";
import { Header } from "../header/Header";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PBreadcrumbs } from "../PBreadcrumbs";

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
        <EmberView path={`libros/${id}`}/>
</>
}