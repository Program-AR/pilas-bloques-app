import { AppBar, Grid, Typography } from "@mui/material";
import { ChangeLanguageButton } from "./ChangeLanguageButton";
import styles from './header.module.css';
import { SessionButton } from "../users/login/SessionButton";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { SimpleReadSwitch } from "./SimpleReadSwitch";
import { useThemeContext } from "../../theme/ThemeContext";

type HeaderProps = {
    CenterComponent?: React.ReactNode,
    SubHeader?: React.ReactNode,
    shouldShowSimpleReadSwitch?: boolean
}

type HeaderTextProps = {
    text: string
}

export const HeaderText = (props: HeaderTextProps) => {

	return <Typography 
		className={styles["header-text"]}>
		{props.text}
	</Typography>
}

export const Header = ({CenterComponent= <></>, SubHeader=<></>, shouldShowSimpleReadSwitch=true}: HeaderProps) => {
    const { theme } = useThemeContext()
    
    return <AppBar position="sticky" sx={{ bgcolor: theme.palette.background.default }} elevation={0}>
            <Grid container className={styles['header']} wrap="nowrap">
                <Link to="/" style={{display: 'flex'}}><img src="imagenes/pblogo-whiteborder.svg" className={styles['logo']} alt="logo pilas bloques"/></Link>
                {CenterComponent}
                <div>
                    <ChangeLanguageButton/>
                    {shouldShowSimpleReadSwitch && <SimpleReadSwitch/>}
                    <DarkModeSwitch/>
                    <SessionButton/>
                </div>
            </Grid>
            {SubHeader}
        </AppBar>
}


