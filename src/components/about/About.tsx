import { Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "../header/Header"
import styles from "./about.module.css"
import { Container } from "@mui/material";

export const About = () =>{
    const {t} = useTranslation("about")
    return <>
    <Header/>
    <Container className={styles.about}>
        <Typography className={styles.title} variant="h4">{t("title")}</Typography>
        <Typography>{t("text")}
            <Link to="https://pilasbloques.program.ar/acerca-de-pilas-bloques/" target="_blank">{t("redirect")}</Link>
        </Typography>
    </Container>
    </>
}