import { Typography, Card, CardMedia } from "@mui/material"
import { useTranslation } from "react-i18next";
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
        <Card style={{ width:"14rem", backgroundColor: props.color, borderRadius: "20px", padding: "30px", margin: "30px"}}>
            <CardMedia component="img" alt={props.text} image={`.${props.image}`} height="120" sx={{objectFit: "contain"}} />
            <Typography variant="h5" align="center" fontWeight="600" >{props.text}</Typography>
        </Card>
    )
}