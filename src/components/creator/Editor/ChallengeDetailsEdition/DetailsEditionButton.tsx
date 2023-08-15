import { Typography, useMediaQuery, CardMedia, Stack, CardActionArea, CardActionAreaProps } from "@mui/material";
import { PBCard } from "../../../PBCard";
import theme from '../../../../theme';

type DetailsEditionButtonProps = {
    imageurl: string
    text: string
} & CardActionAreaProps

export const DetailsEditionButton = (props: DetailsEditionButtonProps) => {
    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <PBCard sx={{flexGrow:"1"}} >
                < CardActionArea 
                    style={{margin:"6px", textTransform:"none"}} 
                    {...props}>
                    
                    <Stack alignItems="center">
                        <CardMedia
                            component="img" 
                            src={props.imageurl} 
                            alt={props.text} 
                            style={{maxHeight:"60px", objectFit:"contain"}}
                        />
                        
                        { !isSmallScreen ? 
                                <Typography variant="body2" textAlign="center">{props.text}</Typography>
                        : ''}
                    </Stack>
                </CardActionArea>
                
        </PBCard>
    )
}
