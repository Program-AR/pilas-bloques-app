import { Stack, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, LinkProps } from "react-router-dom";
import GitInfo from 'react-git-info/macro';
import { Code } from "@mui/icons-material";

type PBLinkProps = {
  children: React.ReactNode
}

const PBLink = (props: LinkProps & PBLinkProps) => <Link {...props} style={{color: 'var(--theme-link-color)'}}>{props.children}</Link>

const Version = () => {
    if(!process.env.REACT_APP_VERSION) throw new Error("Missing Pilas Bloques version. ENV not set")
    const {t} = useTranslation("footer")
    const gitInfo = GitInfo()
    const repoUrl = `https://github.com/Program-AR/pilas-bloques-react/tree/${gitInfo.commit.hash}`
    return <Stack direction="row">
      {t("version")} {process.env.REACT_APP_VERSION}
      <Code/>
      <PBLink to={repoUrl} target="_blank">{gitInfo.commit.shortHash}</PBLink>
    </Stack>
}

const Links = () =>{
    const {t} = useTranslation("footer")
    const termsAndConditionsLink = "https://docs.google.com/document/u/1/d/e/2PACX-1vTNX9zl8txZmuINNz2qODrodoQhvr0o2-r3T_6yFp6quEpidmPz6ORx1HSjo2KNUg6MnyHPN-Ti44z1/pub"
    
    return <>
        <PBLink to="acercade">{t("aboutPilasBloques")}</PBLink> |
        <PBLink to="https://pilasbloques.program.ar/docentes"> {t("toTeachersSite")}</PBLink> |
        <PBLink to={termsAndConditionsLink}> {t("terms")}</PBLink>
    </>
}
export const Footer = () =>
  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ padding: '10px' }} justifyContent="space-evenly">
    <Grid>
      <Version />
      <Links />
    </Grid>
    <img src="imagenes/footer-logos.svg" style={{maxWidth: "30rem"}} alt="logos"/>
  </Stack>
