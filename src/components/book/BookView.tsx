import { Breadcrumbs, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Book, getBook } from "../../staticData/books";
import { EmberView } from "../EmberView";
import { Header } from "../header/Header";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Breadcrumb = (book: Book) => {
    const {t} = useTranslation("books")


    return <Breadcrumbs separator=">">

        <Link to="/">
            <HomeIcon/> 
        </Link>
        
        <Typography>{t(`${book.id}.title`)}</Typography>

    </Breadcrumbs>
}

export const BookView = () => {
    const {id} = useParams()
    const book: Book = getBook(Number(id))

    return <>
        <Header CenterComponent={Breadcrumb(book)}/>
        <EmberView path={`libros/${id}`}/>
</>
}