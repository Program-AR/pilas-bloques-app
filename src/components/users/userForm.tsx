import { Divider, Link, Stack, TextField, TextFieldProps, Typography } from "@mui/material"
import { FormEvent } from "react"
import { useThemeContext } from "../../theme/ThemeContext"
import { PBCard } from "../PBCard"
import styles from './userForm.module.css';
import { PBLink } from "../footer/Footer";

export const PBMailLink = () => {

    const PILAS_MAIL = 'pilasbloques@program.ar'

    return <PBLink to={`mailto:${PILAS_MAIL}`}>{PILAS_MAIL}</PBLink>
}

type UserCardProps = {
    title: string,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    children: React.ReactNode
}

export const UserCard = (props: UserCardProps) => {

    const { theme } = useThemeContext()

    return <>
        <Stack style={{ justifyContent: 'center', minHeight: '100vh', alignItems: "center", backgroundImage: "url(imagenes/book-background.svg)" }}>
            <PBCard style={{ maxWidth: 'calc(var(--creator-max-width)*0.75', padding: theme.spacing(2) }}>
                <Stack alignItems="center">
                    <Typography variant="h4">{props.title}</Typography>
                    <img alt="register" width="40%" src="imagenes/session/register.png"></img>
                    <Divider sx={{ width: "100%", margin: theme.spacing(1) }} variant="middle" />
                    <form onSubmit={props.handleSubmit} className={styles['form']}>
                        {props.children}
                    </form>
                </Stack>
            </PBCard>
        </Stack>
    </>
}

export const UserTextField = (props: TextFieldProps) =>
    <TextField
        {...props}
        className={styles['input']}
        variant="standard"
    />

