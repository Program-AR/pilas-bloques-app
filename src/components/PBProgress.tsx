import { Box, CircularProgress, SxProps, Theme } from "@mui/material"

type PBProgressProps = { sx?: SxProps<Theme>}

export const PBProgress = ( {sx} : PBProgressProps) => {
    return <Box justifyContent="center" display="flex" alignItems="center" height="100%" sx={{...sx}}>
             <CircularProgress sx={{color: "primary"}} thickness={2} size={150}/>
        </Box>
}