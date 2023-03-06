import { Card, CardActionArea, Stack, Typography } from "@mui/material"
import TotoInitial from "../../assets/toto-initial-level.svg"
import TotoIntermediate from "../../assets/toto-intermediate-level.svg"
import TotoAdvanced from "../../assets/toto-advanced-level.svg"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type BookCardProps = {
    url: string,
    nameKey: string,
    image: string,
    color: string 
}

const BookCard = (props: BookCardProps) => {
    const { t } = useTranslation("home/bookCards");

    return (
    <Link to={props.url}>
        <Card style={{ width:"9rem", backgroundColor: props.color}}>
            <img src={props.image}></img>
            <Typography variant="h5" align="center">{t(props.nameKey)}</Typography>
        </Card>
    </Link>
    )
}
const InitialBookCard = () => <BookCard url="libros/1" nameKey="initial" color="#FCE43E" image={TotoInitial}/>
const IntermediateBookCard = () => <BookCard url="libros/2" nameKey="intermediate" color="#53BF24" image={TotoIntermediate}/>
const AdvancedBookCard = () => <BookCard url="libros/100" nameKey="advanced" color="#32CFC1" image={TotoAdvanced}/>

export const BookCards = () =>
    <Stack direction="row" spacing={10}>
        <InitialBookCard/>
        <IntermediateBookCard/>
        <AdvancedBookCard/>
    </Stack>