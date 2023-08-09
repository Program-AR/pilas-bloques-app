import { Stack, Button, Typography, ButtonProps } from "@mui/material";

type DetailsEditionButtonProps = {
    imageurl: string,
    text: string
} & ButtonProps

export const DetailsEditionButton = (props: DetailsEditionButtonProps) => 
<Stack alignItems="center">
    <Button 
        variant="outlined" 
        size="large"
        style={{margin:"6px", textTransform:"none"}} 
        sx={{width:200, height: 110}}
        {...props}
        >

        <img src={props.imageurl} alt={props.text} width={"100%"} height={"80%"}/>

    </Button>

<Typography variant='h6'>{props.text}</Typography>

</Stack>  