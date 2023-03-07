import { Button, Container, Grid, Typography } from "@mui/material"
import {ReactComponent as Background} from '../../assets/home-background.svg'
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BookCards} from "./BookCards"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterButton = () => {
    const { t } = useTranslation("home/home");

    return <Link to="register"><Button variant="outlined" startIcon={<ArrowForwardIcon />}>{t("signUp")}</Button></Link>
}

export const Home = () => {
    const { t } = useTranslation("home/home");

    return <>
    <Container style={{marginBottom: "-18rem", height: "30rem", zIndex: -1, position: "relative", maxWidth: "100%"}}><Background/></Container>
    
    <Grid style={{backgroundColor: '#311C3B'}} container direction="column" alignItems="center" justifyContent="space-evenly" height={"40rem"}>
        <Container maxWidth="xs"><PBLogo/></Container>
        <Typography color="white" variant="h5">{t("title")}</Typography>
        <RegisterButton/>
        <BookCards/>
    </Grid>
</>
}