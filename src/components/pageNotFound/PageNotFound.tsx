import { Typography, Button, Stack } from "@mui/material"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "../header/Header"
import styles from "./pageNotFound.module.css"

type PageNotFoundProps = {
    title?: string,
    error?: string,
}

export const PageNotFound = (props: PageNotFoundProps) =>{
    const {t} = useTranslation("pageNotFound")

    return <>
        <Header/>
        <Stack direction='column' alignItems='center'>
            <Typography className={styles.title} variant="h4">{props.title ? props.title : t("title")}</Typography>
            <img alt="capy" className={styles.image} src='imagenes/capy_error.png' />
            <Typography className={styles.text} variant="h6">{props.error ? props.error : t("text")}</Typography>
            <Link to="/">
                <Button variant="contained" color="success" >{t("home")}</Button>
            </Link>
        </Stack>
    </>
}