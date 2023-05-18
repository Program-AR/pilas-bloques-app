import { Button, Container, Divider, Grid, Typography } from "@mui/material"
import {ReactComponent as Background} from '../../assets/home-background.svg'
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BookCards } from "./BookCards"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footer } from "../footer/Footer";
import { Header, HeaderText } from "../header/Header";
import styles from './home.module.css';
import { CreatorCards } from "./CreatorCards";

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
    <Container className={styles.background} maxWidth={false}><Background/></Container>
    
    <Grid className={styles['home-container']} container direction='column'>
        <Container className={styles.logo} maxWidth="sm"><PBLogo/></Container>
        <Typography className={styles.title} variant="h5">{t("title")}</Typography>
        <RegisterButton />
        <BookCards/>
        <Divider style={{ width:'90%', borderColor: 'white' }}/>
        <CreatorCards/>
    </Grid>
    <Footer/>
</>
}