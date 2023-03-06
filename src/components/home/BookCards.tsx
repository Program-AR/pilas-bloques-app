import { Card, CardActionArea, Stack, Typography } from "@mui/material"
import TotoInitial from "../../assets/toto-initial-level.svg"
import TotoIntermediate from "../../assets/toto-intermediate-level.svg"
import TotoAdvanced from "../../assets/toto-advanced-level.svg"
import { Link } from "react-router-dom";

type BookCardProps = {
    url: string,
    name: string,
    image: string,
    color: string 
}

const BookCard = (props: BookCardProps) => 
    <Link to={props.url}>
        <Card style={{minHeight:"10rem", minWidth:"8rem", backgroundColor: props.color}}>
            <img src={props.image}></img>
            <Typography variant="h5" align="center">{props.name}</Typography>
        </Card>
    </Link>

const InitialBookCard = () => <BookCard url="libros/1" name="Inicial" color="#FCE43E" image={TotoInitial}/>
const IntermediateBookCard = () => <BookCard url="libros/2" name="Intermedio" color="#53BF24" image={TotoIntermediate}/>
const AdvancedBookCard = () => <BookCard url="libros/100" name="Avanzado" color="#32CFC1" image={TotoAdvanced}/>

export const BookCards = () =>
    <Stack direction="row" spacing={10}>
        <InitialBookCard/>
        <IntermediateBookCard/>
        <AdvancedBookCard/>
    </Stack>