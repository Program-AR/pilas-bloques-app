import { Typography, Card } from "@mui/material"
import { useTranslation } from "react-i18next";

export type HomeCardProps = {
    nameKey: string,
    image: string,
    color: string
}

export const HomeCard = (props: HomeCardProps) => {
    const { t } = useTranslation("home/cards");

    return (
        <Card style={{ width:"9rem", backgroundColor: props.color}}>
            <img src={`.${props.image}`}/>
            <Typography variant="h5" align="center">{t(props.nameKey)}</Typography>
        </Card>
    )
}