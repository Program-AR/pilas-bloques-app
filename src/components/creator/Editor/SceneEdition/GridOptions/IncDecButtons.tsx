import { Stack, Typography, Button, ButtonGroup, useMediaQuery } from '@mui/material';
import theme from '../../../../../theme';

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
    const flexStyles = ( useMediaQuery(theme.breakpoints.down('sm')) ) 
                             ? ( { flexMinWidth: "5px", flexTextWidth: "25px", flexFontSize: "small" } ) 
                             : ( { flexMinWidth: "40px", flexTextWidth: "45px", flexFontSize: "large" } )
    
    const handleValue = (inc: boolean) => {
        if(inc && props.value < props.max){
            props.add()
        }
        if(!inc && props.value > props.min){
            props.remove()
        }
    }

    return (
        <Stack sx={{ alignItems: "center", padding:"5px" }}>
            <ButtonGroup variant="contained" size="small" color="inherit" aria-label="small outlined button group">
                <Button style={{ fontSize: flexStyles.flexFontSize, minWidth: flexStyles.flexMinWidth, borderRight:"0px" }} onClick={()=>handleValue(false)}data-testid={`dec-btn-${props.testId}`}>-</Button>
                <Stack sx={{ alignItems: "center", justifyContent: "center", width: flexStyles.flexTextWidth }} >{props.value}</Stack>
                <Button style={{ fontSize: flexStyles.flexFontSize, minWidth: flexStyles.flexMinWidth, borderRight:"0px" }} onClick={()=>handleValue(true)} data-testid={`inc-btn-${props.testId}`}>+</Button>
            </ButtonGroup>
            {props.label && <Typography sx={{marginTop: '5px'}} textAlign="center" variant="subtitle2">{props.label}</Typography>}
        </Stack>
    );
}
