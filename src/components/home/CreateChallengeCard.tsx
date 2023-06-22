import { Typography, Card, CardMedia } from "@mui/material"
import { Link } from "react-router-dom";
import styles from "./creatorCards.module.css";

export type HomeCardCreatorProps = {
    text: string,
    image: string,
    color: string
}

type LinkCardCreatorProps = {url: string} & HomeCardCreatorProps

export const LinkCardCreator = (props: LinkCardCreatorProps) =>
    <Link to={props.url} style={{ textDecoration: 'none' }}>
        {HomeCardCreator(props)}
    </Link>

export const HomeCardCreator = (props: HomeCardCreatorProps) => {
    
    return (
        <Card style={{ width:"14rem", backgroundColor: props.color, borderRadius: "20px", padding: "30px", margin: "30px"}}>
            <div className={styles['creator-card-img']} >
                <img src={`imagenes/${props.image}`} style={{filter:"invert(100%)", padding:"15px"}} />
            </div>
            <div className={styles['creator-card-text']}>
                <Typography variant="h6" align="center" fontWeight="300" >{props.text}</Typography>
            </div>
        </Card>
    )
}