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
    <Container className={styles.container}>
        <Typography className={styles.title} variant="h4">{t("title")}</Typography>
        <Stack>
            <CardMedia            
                component="img" alt="capy" className={styles.image}
                height="auto" 
                image='imagenes/capy_error.png'
                />       
        </Stack>
        <Typography className={styles.text} variant="h6">{t("text")}</Typography>
        <Link to="">
            <Button variant="contained" color="success" >{t("home")}</Button>
        </Link>

    </Container>
    </>
}