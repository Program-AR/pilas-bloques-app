import { Stack, Grid, Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import {ReactComponent as FooterLogos} from "../../assets/footer-logos.svg"

const Version = () => 
    <div>Versión 1.2.3 - pepita</div>

const Links = () =>{
    const {t} = useTranslation("footer")
    const termsAndConditionsLink = "https://docs.google.com/document/u/1/d/e/2PACX-1vTNX9zl8txZmuINNz2qODrodoQhvr0o2-r3T_6yFp6quEpidmPz6ORx1HSjo2KNUg6MnyHPN-Ti44z1/pub"
    
    return <>
        <Link href="acercade">{t("aboutPilasBloques")}</Link> |
        <Link href="docentes"> {t("toTeachersSite")}</Link> |
        <Link href={termsAndConditionsLink}> {t("terms")}</Link>
    </>
}

export const Footer = () => 
    <Stack direction="row" justifyContent={"center"} spacing={12}>

        <Grid> 
            <Typography fontSize={"14px"}>
                <Version/>
                <Links/>
            </Typography>
        </Grid>

        <FooterLogos width={"30%"}/>

    </Stack>