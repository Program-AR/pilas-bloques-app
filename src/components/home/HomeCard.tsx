import { Typography, Card, CardMedia } from "@mui/material"
import { Link } from "react-router-dom";
import styles from "./homeCard.module.css";

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
        <Card className={styles['home-card']} style={{ backgroundColor: props.color}}>
            <CardMedia component="img" alt={props.text} image={`imagenes/${props.image}`} height="120" sx={{objectFit: "contain"}} />
            <Typography color='rgb(0,0,0,0.87)' variant="h5" align="center" fontWeight="600" >{props.text}</Typography>
        </Card>
    )
}