import { Button, Container, Grid, Stack, Typography } from "@mui/material"
import {ReactComponent as Background} from '../../assets/home-background.svg'
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BookCards } from "./BookCards"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { ImportChallengeCard } from "./ImportChallengeCard";
import theme from '../../theme';
import styles from './home.module.css';
import CreatorImage from "../../assets/placeholder.png"
import { LinkCard } from "./HomeCard";

const RegisterButton: React.FC = () => {
    const { t } = useTranslation("home");

    return <>
    <Link to="register">
        <Button variant="outlined" style={{color: "white", borderColor: "white"}} startIcon={<ArrowForwardIcon />}>{t("signUp")}</Button>
    </Link>
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
    const { t } = useTranslation("home");

    return <>
    <Header CenterComponent={<HeaderText/>}/>
    <Container className={styles.background} maxWidth={false}><Background/></Container>
    
    <Grid className={styles['home-logo-grid']} container direction={{ xs: 'row', sm: 'column' }}>
        <Container className={styles.logo} maxWidth="sm"><PBLogo/></Container>
        <Typography className={styles.title} variant="h5">{t("title")}</Typography>
        <RegisterButton />
    </Grid>
    <Grid className={styles['home-grid']} container direction={{ xs: 'row', sm: 'column' }}>
        <BookCards/>
        <Stack direction="row" spacing={10}>
            <LinkCard url="/creador/seleccionar" nameKey="creator" color="#ec3efc" image={CreatorImage}/>
            <ImportChallengeCard/>
        </Stack>
    </Grid>
    <Footer/>
</>
}