import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next";
import { Header } from "../header/Header"
import styles from "./about.module.css"
import { UserCard } from "../users/userForm";
import { PBLink } from "../footer/Footer";

export const About = () => {
    const { t } = useTranslation("about")
    return <>
        <Header />
        <UserCard title={t("title")} handleSubmit={() => { }}>
            <Typography className={styles.title} variant="h4"></Typography>
            <Typography>{t("text")}
                <PBLink to="https://pilasbloques.program.ar/acerca-de-pilas-bloques/">{t("redirect")}</PBLink>
            </Typography>
        </UserCard>
    </>
}