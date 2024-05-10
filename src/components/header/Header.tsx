import { AppBar, Drawer, Grid, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { ChangeLanguageButton } from "./ChangeLanguageButton";
import styles from './header.module.css';
import { SessionButton } from "../users/login/SessionButton";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { SimpleReadSwitch } from "./SimpleReadSwitch";
import { useThemeContext } from "../../theme/ThemeContext";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

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

export const Header = ({ CenterComponent = <></>, SubHeader = <></>, shouldShowSimpleReadSwitch = true }: HeaderProps) => {
    const { theme } = useThemeContext()

    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

    return <AppBar position="sticky" sx={{ bgcolor: theme.palette.background.default }} elevation={0}>
        <Grid container className={styles['header']} wrap="nowrap">
            {!isSmallScreen ? <>
                <Link to="/" style={{ display: 'flex' }}><img src="imagenes/pblogo-whiteborder.svg" className={styles['logo']} alt="logo pilas bloques" /></Link>
                {CenterComponent}
            </>
                : <Menu CenterComponent={CenterComponent} />}
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

type MenuProps = {
    CenterComponent?: React.ReactNode,
}

const Menu = ({ CenterComponent }: MenuProps) => {

    const [openMenu, setOpenMenu] = useState<boolean>(false)

    return <>
        <IconButton onClick={() => setOpenMenu(true)}>
            <MenuIcon color="primary"></MenuIcon>
        </IconButton>

    </>
}


