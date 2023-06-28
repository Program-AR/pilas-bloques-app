import { useState } from 'react';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';

type IncDecButtonsProps = {
    min?: number
    max?: number
    label?: string
}

export const IncDecButtons = (props: IncDecButtonsProps) => {
   const [value, setValue] = useState(0)

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

   
  return (
    <Box sx={{ display:"flex", flexDirection: "column", alignItems: "center"}}>
    <Typography variant="caption">{props.label}</Typography>
    <ButtonGroup variant="contained" size="small" color="inherit" aria-label="small outlined button group">
    <Button onClick={()=>handleValue(true)}>+</Button>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width:"45px" }} >{value}</Box>
    <Button onClick={()=>handleValue(false)}>-</Button>
    </ButtonGroup>
    </Box>
  );
}
