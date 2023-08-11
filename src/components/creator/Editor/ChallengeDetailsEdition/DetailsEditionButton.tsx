import { Typography, useMediaQuery, CardMedia, CardContent, CardActionArea, CardActionAreaProps } from "@mui/material";
import { PBCard } from "../../../PBCard";
import { IconButtonTooltip } from "../SceneEdition/IconButtonTooltip";
import theme from '../../../../theme';

type DetailsEditionButtonProps = {
    imageurl: string
    optionalicon?: React.ReactNode
    text: string
} & CardActionAreaProps

export const DetailsEditionButton = (props: DetailsEditionButtonProps) => {
    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <PBCard sx={{justifyContent: "center", maxWidth:"190px"}}>
                
                {//isSmallScreen ?
                
                    //<IconButtonTooltip onClick={props.onClick} icon={props.optionalicon} tooltip={props.text} />
                }
                <CardActionArea 
                    style={{margin:"6px", textAlign:"center", textTransform:"none"}} 
                    {...props}>

                    <CardMedia component="img" src={props.imageurl} alt={props.text}/>
                    { !isSmallScreen ? 
                    <CardContent>
                        <Typography variant="body2">{props.text}</Typography>
                    </CardContent>
                     : ''}
                </CardActionArea>
                
        </PBCard>
    )
}
