import { Stack, Grid, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from './footer.module.css';
import { ReactComponent as FooterLogos } from "../../assets/footer-logos.svg"
import { Link } from "react-router-dom";

const Version = () =>
  <Typography className={styles["version"]} >
    Versión 1.2.3 - pepita
  </Typography>

const Links = () => {
  const { t } = useTranslation("footer")
  const termsAndConditionsLink = "https://docs.google.com/document/u/1/d/e/2PACX-1vTNX9zl8txZmuINNz2qODrodoQhvr0o2-r3T_6yFp6quEpidmPz6ORx1HSjo2KNUg6MnyHPN-Ti44z1/pub"

  return <Box className={styles['footer-links']}>
    <Link to="acercade">{t("aboutPilasBloques")}</Link> |
    <Link to="https://pilasbloques.program.ar/docentes" target="_blank"> {t("toTeachersSite")}</Link> |
    <Link to={termsAndConditionsLink} target="_blank"> {t("terms")}</Link>
  </Box>
}
export const Footer = () =>
  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ padding: '10px' }} justifyContent="space-evenly">
    <Grid>
      <Version />
      <Links />
    </Grid>
    <FooterLogos style={{maxWidth: "30rem"}}/>
  </Stack>