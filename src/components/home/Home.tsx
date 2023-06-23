import { Button, Container, Divider, Grid, Typography } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BookCards } from "./BookCards"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footer } from "../footer/Footer";
import { Header, HeaderText } from "../header/Header";
import styles from './home.module.css';
import { CreatorCards } from "./CreatorCard";

const RegisterButton: React.FC = () => {
    const { t } = useTranslation("home");

    return <>
        <Button 
            component={Link} 
            to="register" 
            variant="outlined" 
            size="large"
            style={{color: "white", borderColor: "white", borderRadius:"20px", textTransform:"none"}} 
            startIcon={<ArrowForwardIcon />}
        >
            {t("signUp")}
        </Button>
</>
}

export const Home = () => {
    const { t } = useTranslation("home");

    return <>
    <Header CenterComponent={<HeaderText text={t("header")}/>}/>
    <Container className={styles.background} maxWidth={false}><img src='imagenes/home-background.svg'/></Container>
    
    <Grid className={styles['home-container']} container direction='column'>
        <Container className={styles.logo} maxWidth="sm"><img src="imagenes/pblogo-whiteborder.svg"/></Container>
        <Typography className={styles.title} variant="h5">{t("title")}</Typography>
        <RegisterButton />
        <BookCards/>
        <Divider style={{ width:'90%', borderColor: 'white' }}/>
        <Typography className={styles.title} variant="h5">{t("creatorTitle")}</Typography>
        <CreatorCards/>
    </Grid>
    <Footer/>
</>
}