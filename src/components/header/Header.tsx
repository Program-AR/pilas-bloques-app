import { AppBar, Grid } from "@mui/material";
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import { ChangeLanguageButton } from "./ChangeLanguageButton";
import styles from './header.module.css';
import { SessionButton } from "./login/SessionButton";
import { Link } from "react-router-dom";

type HeaderProps = {
    CenterComponent: React.ReactNode
}

export const Header = (props: HeaderProps) => {
    
    return <AppBar position="fixed" elevation={0}>
            <Grid container className={styles['header']}>
                <Link to="/"><PBLogo className={styles['logo']}/></Link>
                {props.CenterComponent}
                <div>
                    <ChangeLanguageButton/>
                    <SessionButton/>
                </div>
            </Grid>
        </AppBar>
}


