import { AppBar, Grid } from "@mui/material";
import {ReactComponent as PBLogo} from "./pblogo-whiteborder.svg"
import { useTranslation } from 'react-i18next';
import { ChangeLanguageButton } from "./ChangeLanguageButton";
import styles from './header.module.css';

export const Header = () => {
    const { t } = useTranslation("header");
    
    return <AppBar position="fixed" elevation={0}>
            <Grid container className={styles.header}>
                <PBLogo className={styles.logo}/>
                <p className={styles.headerTitle}>{t('tool')}</p>
                <ChangeLanguageButton/>
            </Grid>
        </AppBar>
}


