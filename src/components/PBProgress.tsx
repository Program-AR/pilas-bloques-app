import { Box, CircularProgress } from "@mui/material"

export const PBProgress = () => {
    return <Box justifyContent="center" display="flex" alignItems="center" height="100%">
             <CircularProgress sx={{color: "primary"}} thickness={2} size={150}/>
        </Box>
}