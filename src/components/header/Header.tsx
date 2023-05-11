import { AppBar, Grid, Typography } from "@mui/material";
import {ReactComponent as PBLogo} from "../../assets/pblogo-whiteborder.svg"
import { ChangeLanguageButton } from "./ChangeLanguageButton";
import styles from './header.module.css';
import theme from '../../theme';
import { SessionButton } from "./login/SessionButton";
import { Link } from "react-router-dom";

type HeaderProps = {
    CenterComponent?: React.ReactNode
}

type HeaderTextProps = {
    text: string
}

export const HeaderText = (props: HeaderTextProps) => (
	<Typography
		className={styles["header-text"]}
		sx={{ [theme.breakpoints.down("sm")]: { display: "none" } }}>
		{props.text}
	</Typography>
)

export const Header = ({CenterComponent= <></>}: HeaderProps) => {
    
    return <AppBar position="fixed" elevation={0}>
            <Grid container className={styles['header']}>
                <Link to="/"><PBLogo className={styles['logo']}/></Link>
                {CenterComponent}
                <div>
                    <ChangeLanguageButton/>
                    <SessionButton/>
                </div>
            </Grid>
        </AppBar>
}


