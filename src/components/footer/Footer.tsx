import { Stack, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import {ReactComponent as FooterLogos} from "../../assets/footer-logos.svg"
import { Link } from "react-router-dom";
import GitInfo from 'react-git-info/macro';
import { Code } from "@mui/icons-material";

const Version = () => {
    if(!process.env.REACT_APP_VERSION) throw new Error("Missing Pilas Bloques version. ENV not set")
    const {t} = useTranslation("footer")
    const gitInfo = GitInfo()
    const repoUrl = `https://github.com/Program-AR/pilas-bloques-react/tree/${gitInfo.commit.hash}`
    return <Stack direction="row">
      {t("version")} {process.env.REACT_APP_VERSION}
      <Code/>
      <Link to={repoUrl} target="_blank">{gitInfo.commit.shortHash}</Link>
    </Stack>
}

const Links = () =>{
    const {t} = useTranslation("footer")
    const termsAndConditionsLink = "https://docs.google.com/document/u/1/d/e/2PACX-1vTNX9zl8txZmuINNz2qODrodoQhvr0o2-r3T_6yFp6quEpidmPz6ORx1HSjo2KNUg6MnyHPN-Ti44z1/pub"
    
    return <>
        <Link to="acercade">{t("aboutPilasBloques")}</Link> |
        <Link to="https://pilasbloques.program.ar/docentes"> {t("toTeachersSite")}</Link> |
        <Link to={termsAndConditionsLink}> {t("terms")}</Link>
    </>
}
export const Footer = () =>
  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ padding: '10px' }} justifyContent="space-evenly">
    <Grid>
      <Version />
      <Links />
    </Grid>
    <FooterLogos style={{maxWidth: "30rem"}}/>
  </Stack>
