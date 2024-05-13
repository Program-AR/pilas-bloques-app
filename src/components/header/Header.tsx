import { AppBar, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
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

const HomeLinkImg: React.FC<{ img: string }> = ({ img }) => <Link to="/" style={{ display: 'flex' }}><img src={`imagenes/${img}`} className={styles['logo']} alt="logo pilas bloques" /></Link>

export const Header = ({ CenterComponent = <></>, SubHeader = <></>, shouldShowSimpleReadSwitch = true }: HeaderProps) => {
    const { theme } = useThemeContext()

    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

    return <AppBar position="sticky" sx={{ bgcolor: theme.palette.background.default }} elevation={0}>
        <Grid container className={styles['header']} wrap="nowrap">
            <HomeLinkImg img={isSmallScreen ? "cropped-pbicon.png" : "pblogo-whiteborder.svg"} />
            {CenterComponent}
            <Stack direction='row'>
                <ChangeLanguageButton />
                {shouldShowSimpleReadSwitch && <SimpleReadSwitch />}
                <DarkModeSwitch />
                <SessionButton />
            </Stack>
        </Grid>
        {SubHeader}
    </AppBar>
}