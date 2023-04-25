import { Stack, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from './footer.module.css';
import {ReactComponent as FooterLogos} from "../../assets/footer-logos.svg"
import { Link } from "react-router-dom";

const Version = () => 
    <span className={styles["version"]}>Versión 1.2.3 - pepita</span>

const Links = () =>{
    const {t} = useTranslation("footer")
    const termsAndConditionsLink = "https://docs.google.com/document/u/1/d/e/2PACX-1vTNX9zl8txZmuINNz2qODrodoQhvr0o2-r3T_6yFp6quEpidmPz6ORx1HSjo2KNUg6MnyHPN-Ti44z1/pub"
    
    return <div className={styles['footer-links']}>
        <Link to="acercade" target="_blank">{t("aboutPilasBloques")}</Link> |
        <Link to="https://pilasbloques.program.ar/docentes" target="_blank"> {t("toTeachersSite")}</Link> |
        <Link to={termsAndConditionsLink} target="_blank"> {t("terms")}</Link>
    </div>
}
//spacing={12}
export const Footer = () => 
    <Stack direction={'row'} spacing={12} justifyContent={"center"}>
        <Grid> 
            <Typography fontSize={"18px"}>
                <Version/>
                <br/>
                <Links/>
            </Typography>
        </Grid>

        <FooterLogos width="30rem"/>

    </Stack>