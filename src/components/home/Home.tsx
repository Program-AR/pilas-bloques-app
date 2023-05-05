import { Button, Container, Divider, Grid, Typography } from "@mui/material"
import {ReactComponent as Background} from '../../assets/home-background.svg'
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BookCards } from "./BookCards"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import theme from '../../theme';
import styles from './home.module.css';
import { CreatorCards } from "./CreatorCards";

const RegisterButton: React.FC = () => {
    const { t } = useTranslation("home/home");

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

const HeaderText: React.FC = () => {
    const { t } = useTranslation("header");
    return <Typography className={styles['header-text']} 
                       sx={{[theme.breakpoints.down('sm')]: {display: 'none' } }}>
                {t('tool')}
            </Typography>
} 

export const Home = () => {
    const { t } = useTranslation("home/home");

    return <>
    <Header CenterComponent={<HeaderText/>}/>
    <Container className={styles.background} maxWidth={false}><Background/></Container>
    
    <Grid className={styles['logo-grid']} container direction={{ xs: 'row', sm: 'column' }}>
        <Container className={styles.logo} maxWidth="sm"><PBLogo/></Container>
        <Typography className={styles.title} variant="h5">{t("title")}</Typography>
        <RegisterButton />
    </Grid>
    <Grid className={styles['cards-group']} container direction='column'>
        <BookCards/>
        <Divider style={{ width:'90%', borderColor: 'white' }}/>
        <CreatorCards/>
    </Grid>
    <Footer/>
</>
}