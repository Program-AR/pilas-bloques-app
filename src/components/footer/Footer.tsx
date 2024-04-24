import { Code } from "@mui/icons-material";
import { Grid, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, LinkProps } from "react-router-dom";


// TODO: extract links to a config file
const siteUrl = "https://pilasbloques.program.ar"
export const termsAndConditionsLink =
  "https://docs.google.com/document/u/1/d/e/2PACX-1vTNX9zl8txZmuINNz2qODrodoQhvr0o2-r3T_6yFp6quEpidmPz6ORx1HSjo2KNUg6MnyHPN-Ti44z1/pub";

type PBLinkProps = {
  children: React.ReactNode
}

export const PBLink = (props: LinkProps & PBLinkProps) => <Link {...props} style={{color: 'var(--theme-link-color)'}}>{props.children}</Link>


const Version = () => {
  if(!process.env.VITE_VERSION) throw new Error("Missing Pilas Bloques version. ENV not set")
  const {t} = useTranslation("footer")

  const appVersion = process.env.VITE_VERSION
  const newsUrl = new URL(`/novedades`, siteUrl).toString()
  const lastCommitHash = process.env.VITE_GIT_SHORT_COMMIT_HASH
  const repoUrl = `https://github.com/Program-AR/pilas-bloques-app/tree/${process.env.VITE_GIT_COMMIT_HASH}`

  return (
    <Stack direction="row" gap={0.5}>
      {t("version")}
      <PBLink to={newsUrl} target="_blank">
        {appVersion}
      </PBLink>
      <Code />
      <PBLink to={repoUrl} target="_blank">
        {lastCommitHash}
      </PBLink>
    </Stack>
  );
};


const Links = () => {
  const {t} = useTranslation("footer")
  const teachersSiteUrl = new URL(`/docentes`, siteUrl).toString()

  return (
    <Stack direction="row" gap={1}>
      <PBLink to="acercade">{t("aboutPilasBloques")}</PBLink>|
      <PBLink to={teachersSiteUrl}>{t("toTeachersSite")}</PBLink>|
      <PBLink to={termsAndConditionsLink}>{t("terms")}</PBLink>
    </Stack>
  )
};

export const Footer = () =>
  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ padding: '10px' }} justifyContent="space-evenly">
    <Grid>
      <Version />
      <Links />
    </Grid>
    <img src="imagenes/footer-logos.svg" style={{maxWidth: "30rem"}} alt="logos"/>
  </Stack>
