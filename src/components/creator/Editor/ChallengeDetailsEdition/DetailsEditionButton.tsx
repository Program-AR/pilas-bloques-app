import { Typography, useMediaQuery, CardMedia, Stack, CardActionArea, CardActionAreaProps, Tooltip } from "@mui/material";
import { PBCard } from "../../../PBCard";
import { useThemeContext } from "../../../../theme/ThemeContext";

type DetailsEditionButtonProps = {
    imageurl: string
    text: string
} & CardActionAreaProps

export const DetailsEditionButton = (props: DetailsEditionButtonProps) => {
    const { theme } = useThemeContext()

    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <PBCard sx={{padding: theme.spacing(1), flexGrow:"1"}} >
                <CardActionArea {...props}>
                    <Stack alignItems="center">
                        <Tooltip title={isSmallScreen ? props.text : ""}>
                        <CardMedia
                            component="img" 
                            src={props.imageurl} 
                            alt={props.text} 
                            sx={{maxHeight:"50px", objectFit: "contain"}}
                        />
                        </Tooltip>                         
                        
                        { !isSmallScreen ? 
                                <Typography variant="body2" textAlign="center">{props.text}</Typography>
                        : ''}
                    </Stack>
                </CardActionArea>
                
        </PBCard>
    )
}
