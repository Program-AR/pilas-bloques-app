import { AppBar } from "@mui/material";
import {ReactComponent as PBLogo} from "./pblogo-whiteborder.svg"
import { useTranslation } from 'react-i18next';
import './Header.css';

export const Header = () => {
    const { t } = useTranslation("header");
    
    
    return <AppBar position="fixed" className="app-bar" >
        {t('title')}
        <PBLogo height="50px" />
    </AppBar>

}


