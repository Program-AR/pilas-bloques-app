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
        <Card style={{ width:"13rem", backgroundColor: props.color}}>
            <img alt={props.nameKey} src={`.${props.image}`}/>
            <Typography variant="h4" align="center">{t(props.nameKey)}</Typography>
        </Card>
    )
}