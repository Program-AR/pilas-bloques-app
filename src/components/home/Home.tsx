import { Button, Container, Grid, Stack, Typography } from "@mui/material"
import {ReactComponent as Background} from '../../assets/home-background.svg'
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import {ReactComponent as FooterLogos} from "../../assets/footer-logos.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BookCards} from "./BookCards"

const Footer = () => <Stack direction="row" spacing={10} >
    <Grid>
        <Typography >Versión 2.0.5 - br45mhs2</Typography>
        <Typography >Acerca de Pilas Bloques | Ir al sitio para docentes | Términos y condiciones</Typography>
    </Grid>

    <FooterLogos/>
</Stack>

export const Home = () => <>
    <Container sx={{"margin-bottom": "-20%", overflow: "hidden", "z-index":-1, position: "relative"}}><Background/></Container>
    <Grid sx={{backgroundColor: '#311C3B'}} container direction="column" alignItems="center" justifyContent="center">
        <Container maxWidth="xs"><PBLogo/></Container>
        <Typography color="white">Elegí tu nivel y empezá a programar</Typography>
        <Button variant="outlined" startIcon={<ArrowForwardIcon />}>Registrate</Button>
        <BookCards/>
    </Grid>
    <Footer/>
    </>