import { Button, Container, Grid, Typography } from "@mui/material"
import {ReactComponent as Background} from '../../assets/home-background.svg'
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BookCards} from "./BookCards"
import { Link } from "react-router-dom";

const RegisterButton = () => 
    <Link to="register"><Button variant="outlined" startIcon={<ArrowForwardIcon />}>Registrate</Button></Link>

export const Home = () => <>
    <Container style={{marginBottom: "-20%", overflow: "hidden", zIndex: -1, position: "relative"}}><Background/></Container>
    
    <Grid style={{backgroundColor: '#311C3B'}} container direction="column" alignItems="center" justifyContent="space-evenly" minHeight="70%">
        <Container maxWidth="xs"><PBLogo/></Container>
        <Typography color="white">Elegí tu nivel y empezá a programar</Typography>
        <RegisterButton/>
        <BookCards/>
    </Grid>
</>