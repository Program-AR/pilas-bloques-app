import { Stack, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { ReactComponent as FooterLogos } from "../../assets/footer-logos.svg"
import { Link } from "react-router-dom"

const Version = () => <span>Versión 1.2.3 - pepita</span>

const Links = () => {
  const { t } = useTranslation("footer")
  const termsAndConditionsLink =
    "https://docs.google.com/document/u/1/d/e/2PACX-1vTNX9zl8txZmuINNz2qODrodoQhvr0o2-r3T_6yFp6quEpidmPz6ORx1HSjo2KNUg6MnyHPN-Ti44z1/pub"

  return (
    <>
      <Link to="acercade">{t("aboutPilasBloques")}</Link> |
      <Link to="https://pilasbloques.program.ar/docentes">
        {" "}
        {t("toTeachersSite")}
      </Link>{" "}
      |<Link to={termsAndConditionsLink}> {t("terms")}</Link>
    </>
  )
}

export const Footer = () => (
  <Stack
    direction="row"
    justifyContent={"center"}
    alignItems={"center"}
    spacing={12}
    height={"6rem"}
  >
    <Grid>
      <Typography fontSize={"18px"}>
        <Version />
        <br />
        <Links />
      </Typography>
    </Grid>

    <FooterLogos width="30rem" />
  </Stack>
)
