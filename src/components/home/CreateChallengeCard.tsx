import { Typography, Card } from "@mui/material"
import creatorCardsStyles from "./creatorCards.module.css";
import homeCardStyles from "./homeCard.module.css";

export type CreatorCardProps = {
    text: string,
    color: string,
    icon: React.FC<{style: any}>
}

export const CreatorCard = (props: CreatorCardProps) => {
    
    return (
        <Card className={homeCardStyles['home-card']} style={{ backgroundColor: props.color, width: '18rem'}}>
            <div className={creatorCardsStyles['creator-card-icon']} >
                <props.icon style={{fontSize: '2.5em'}} />
            </div>
            <div className={creatorCardsStyles['creator-card-text']}>
                <Typography align="center" fontWeight="400" >{props.text}</Typography>
            </div>
        </Card>
    )
}