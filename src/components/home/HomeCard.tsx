import { Typography, Card } from "@mui/material"
import { Link } from "react-router-dom";

export type HomeCardProps = {
    text: string,
    image: string,
    color: string
}

type LinkCardProps = {url: string} & HomeCardProps

export const LinkCard = (props: LinkCardProps) =>
    <Link to={props.url} style={{ textDecoration: 'none' }}>
        {HomeCard(props)}
    </Link>

export const HomeCard = (props: HomeCardProps) => {
    return (
        <Card style={{ width:"13rem", backgroundColor: props.color, borderRadius: "20px", padding: "30px"}}>
            <img alt={props.text} src={require(`../../assets/${props.image}`)}/> 
            <Typography variant="h5" align="center" fontWeight="600" >{props.text}</Typography>
        </Card>
    )
}