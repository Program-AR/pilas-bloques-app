import { Typography, CardMedia, CardContent, CardActionArea, CardActionAreaProps, Stack } from "@mui/material";
import { PBCard } from "../../../PBCard";

type DetailsEditionButtonProps = {
    imageurl: string,
    text: string
} & CardActionAreaProps

export const DetailsEditionButton = (props: DetailsEditionButtonProps) => 
    <PBCard>
        <CardActionArea 
            style={{margin:"6px", textTransform:"none"}} 
            sx={{width:200, height: 150}}
            {...props}>

            <CardMedia component="img" src={props.imageurl} alt={props.text}/>

            <CardContent>
                <Typography>{props.text}</Typography>
            </CardContent>

        </CardActionArea>
    </PBCard>

