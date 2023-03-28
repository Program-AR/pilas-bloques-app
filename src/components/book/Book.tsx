import { Breadcrumbs, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Book, getBook } from "../../staticData/books";
import { EmberView } from "../EmberView";
import { Header } from "../header/Header";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const Breadcrumb = (book: Book) => {

    return <Breadcrumbs>

        <Link to="/">
            <HomeIcon/> 
        </Link>
        
        <Typography>Ciclo {book.id}</Typography>

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