import { useParams } from "react-router-dom";
import { EmberView } from "../EmberView";

export const Book = () => {
    const {id} = useParams()

    return <EmberView path={`libros/${id}`}/>
}