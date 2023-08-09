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
    const flexStyles = ( useMediaQuery('(max-width:700px)') ) 
                             ? ( { flexDir: "column", flexMinWidth: "5px", flexGroupWidth: "25px", flexTextWidth: "25px", flexFontSize: "small" } ) 
                             : ( { flexDir: "row", flexMinWidth: "40px", flexGroupWidth: "inherit", flexTextWidth: "45px", flexFontSize: "large" } )
    
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
            <ButtonGroup sx={{ flexDirection: flexStyles.flexDir, width: flexStyles.flexGroupWidth }}  variant="contained" size="small" color="inherit" aria-label="small outlined button group">
                <Button style={{ fontSize: flexStyles.flexFontSize, minWidth: flexStyles.flexMinWidth, borderRight:"0px" }} onClick={()=>handleValue(false)}data-testid={`dec-btn-${props.testId}`}>-</Button>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: flexStyles.flexTextWidth }} >{props.value}</Box>
                <Button style={{ fontSize: flexStyles.flexFontSize, minWidth: flexStyles.flexMinWidth, borderRight:"0px" }} onClick={()=>handleValue(true)} data-testid={`inc-btn-${props.testId}`}>+</Button>
            </ButtonGroup>
            {props.label && <Typography sx={{marginTop: '5px'}} textAlign="center" variant="subtitle2">{props.label}</Typography>}
        </Box>
    );
}
