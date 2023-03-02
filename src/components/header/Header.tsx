import { AppBar, Grid, Link } from "@mui/material";
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import { useTranslation } from 'react-i18next';
import { ChangeLanguageButton } from "./ChangeLanguageButton";

export const Header = () => {
    const { t } = useTranslation("header");
    
    
    return <AppBar position="fixed">
            <Grid container justifyContent="space-between">
                <Link href="/"><PBLogo height="50px"/></Link>
                <p align-content="center">{t('tool')}</p>
                <ChangeLanguageButton/>
            </Grid>
        </AppBar>
}


