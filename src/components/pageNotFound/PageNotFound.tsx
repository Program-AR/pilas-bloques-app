import { Typography, Button, Stack, CardMedia } from "@mui/material"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "../header/Header"
import styles from "./pageNotFound.module.css"
import { Container } from "@mui/material";

export const PageNotFound = () =>{
    const {t} = useTranslation("pageNotFound")
    return <>
    <Header/>
    
    <Stack direction='column' alignItems='center'>
        <Typography className={styles.title} variant="h4">{t("title")}</Typography>
        <img alt="capy" className={styles.image} src='imagenes/capy_error.png' />
        <Typography className={styles.text} variant="h6">{t("text")}</Typography>
        <Link to="">
            <Button variant="contained" color="success" >{t("home")}</Button>
        </Link>

    </Stack>
    </>
}