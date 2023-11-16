import { Typography, Button, Stack } from "@mui/material"
import { Link, useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./PBError.module.css"
import { Header } from "../header/Header";

type PbErrorProps = {
    title?: string,
    error?: string,
}

export const PBError = (props: PbErrorProps) =>{
    const {t} = useTranslation("pbError")

    const error = useRouteError() as any

    return <>
        <Header/>
        <Stack direction='column' alignItems='center'>
            <Typography className={styles.title} variant="h4">{props.title ? props.title : t("errorOcurred")}</Typography>
            <img alt="capy" className={styles.image} src='imagenes/capy_error.png' />
            <Typography className={styles.text} variant="h6">{props.error ? props.error : error.message}</Typography>
            <Link to="/">
                <Button variant="contained" color="success" >{t("home")}</Button>
            </Link>
        </Stack>
    </>
}