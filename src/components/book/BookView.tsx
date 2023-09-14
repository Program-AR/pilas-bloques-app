import { Breadcrumbs, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Book, getBook } from "../../staticData/books";
import { EmberView } from "../emberView/EmberView";
import { Header } from "../header/Header";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

const Breadcrumb = (book: Book) => {
    const { theme } = useThemeContext()
    
    const {t} = useTranslation("books")


    return <Breadcrumbs separator=">">

        <Link to="/" style={{textDecoration: "none"}}>
            <HomeIcon style={{ display:'flex', color: '#787878'}}/> 
        </Link>
        
        <Typography sx={{ [theme.breakpoints.down("sm")]: { display: "none" } }}>{t(`${book.id}.title`)}</Typography>

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