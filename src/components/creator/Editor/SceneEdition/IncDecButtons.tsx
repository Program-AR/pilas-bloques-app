import { useEffect, useState } from 'react';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';

type IncDecButtonsProps = {
    returnValue: (val:number) => void
    initialValue?: number
    min?: number
    max?: number
    label?: string | null
    testId?: string 
}

export const IncDecButtons = (props: IncDecButtonsProps) => {
    const [value, setValue] = useState((props.initialValue === undefined) ? 0 : props.initialValue)

    const handleValue = (inc: boolean) => {
        if(inc)
        {
          if (props.max === undefined || value < props.max)
            setValue(value+1)
        }
        else {
          if (props.min === undefined || value > props.min)
            setValue(value-1)

        }
    }
    
    useEffect(() => {
        props.returnValue(value)
    }, [value, props]); 
    
    return (
        <Box sx={{ display:"flex", flexDirection: "column", alignItems: "center"}}>
            {props.label && <Typography variant="caption">{props.label}</Typography>}
            <ButtonGroup variant="contained" size="small" color="inherit" aria-label="small outlined button group">
                <Button style={{ fontSize: 'large' }} onClick={()=>handleValue(false)}data-testid={`dec-btn-${props.testId}`}>-</Button>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width:"45px" }} >{value}</Box>
                <Button style={{ fontSize: 'large' }} onClick={()=>handleValue(true)} data-testid={`inc-btn-${props.testId}`}>+</Button>
            </ButtonGroup>
        </Box>
    );
}
