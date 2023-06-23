import { Typography, Card } from "@mui/material"
import creatorCardsStyles from "./creatorCards.module.css";
import homeCardStyles from "./homeCard.module.css";

export type CreatorCardProps = {
    text: string,
    color: string,
    icon: React.FC
}

export const CreatorCard = (props: CreatorCardProps) => {
    
    return (
        <Card className={homeCardStyles['home-card']} style={{ backgroundColor: props.color}}>
            <div className={creatorCardsStyles['creator-card-icon']} >
                <props.icon />
            </div>
            <div className={creatorCardsStyles['creator-card-text']}>
                <Typography variant="h6" align="center" fontWeight="300" >{props.text}</Typography>
            </div>
        </Card>
    )
}