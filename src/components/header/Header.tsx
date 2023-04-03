import { AppBar, Grid, Link } from "@mui/material";
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import { useTranslation } from 'react-i18next';
import { ChangeLanguageButton } from "./ChangeLanguageButton";
import styles from './header.module.css';
import { SessionButton } from "./login/SessionButton";

export const Header = () => {
    const { t } = useTranslation("header");
    
    return <AppBar position="fixed" elevation={0}>
            <Grid container className={styles['header']}>
                <Link href="#"><PBLogo className={styles['logo']}/></Link>
                <p className={styles['header-title']}>{t('tool')}</p>
                <div>
                    <ChangeLanguageButton/>
                    <SessionButton/>
                </div>

            </Grid>
        </AppBar>
}


