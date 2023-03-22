import { useParams } from "react-router-dom";
import { Book, getBook } from "../../staticData/books";
import { EmberView } from "../EmberView";

export const BookView = () => {
    const {id} = useParams()
    const book: Book = getBook(Number(id))
    return <>
    <h1>Soy el libro {book.id}, algunos de mis capitulos son: {book.chapters.slice(0,5).map(chapter => chapter.id)}</h1>
    <EmberView path={`libros/${id}`}/>

</>
}