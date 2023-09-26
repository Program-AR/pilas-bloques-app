import { Box, CircularProgress } from "@mui/material"

export const PBProgress = () => {
    return <Box justifyContent="center" display="flex" alignItems="center" height="100%">
             <CircularProgress sx={{color: "var(--home-background)"}} thickness={2} size={150}/>
        </Box>
}