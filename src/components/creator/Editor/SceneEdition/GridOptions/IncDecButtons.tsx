import { Box, Typography, Button, ButtonGroup, useMediaQuery } from '@mui/material';

type IncDecButtonsProps = {
    add: () => void
    remove: () => void
    value: number
    min: number
    max: number
    label?: string | null
    testId?: string 
}

export const IncDecButtons = (props: IncDecButtonsProps) => {
    const flexDir: string = useMediaQuery('(max-width:700px)') ? "column" : "row";

    const handleValue = (inc: boolean) => {
        if(inc && props.value < props.max){
            props.add()
        }
        if(!inc && props.value > props.min){
            props.remove()
        }
    }

    return (
        <Box sx={{ display:"flex", flexDirection: "column", alignItems: "center", padding:"10px" }}>
            {props.label && <Typography textAlign="center" variant="caption">{props.label}</Typography>}
            <ButtonGroup sx={{ flexDirection: flexDir }}  variant="contained" size="small" color="inherit" aria-label="small outlined button group">
                <Button style={{ fontSize: 'large', borderRight:"0px" }} onClick={()=>handleValue(false)}data-testid={`dec-btn-${props.testId}`}>-</Button>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width:"45px" }} >{props.value}</Box>
                <Button style={{ fontSize: 'large', borderRight:"0px" }} onClick={()=>handleValue(true)} data-testid={`inc-btn-${props.testId}`}>+</Button>
            </ButtonGroup>
        </Box>
    );
}
