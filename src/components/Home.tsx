import { Button, Container, Grid, Typography } from "@mui/material"
import {ReactComponent as Background} from './Home-Background.svg'
import {ReactComponent as PBLogo} from "./pblogo-whiteborder.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const Home = () => {
    return <>
    <Background/>
    <Grid sx={{backgroundColor: '#311C3B'}}>
        <Container maxWidth="xs"><PBLogo/></Container>
        <Typography align="center" color="white">Elegí tu nivel y empezá a programar</Typography>
        <Button variant="contained" startIcon={<ArrowForwardIcon />}>Registrate</Button>
    </Grid>
    </>
}