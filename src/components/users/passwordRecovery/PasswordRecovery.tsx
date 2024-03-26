import { useSearchParams } from "react-router-dom";
import { EmberView } from "../../emberView/EmberView"
import { Header } from "../../header/Header"
import { Divider, Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { PBCard } from "../../PBCard";
import { useThemeContext } from "../../../theme/ThemeContext";
import styles from './userForm.module.css';
import { FormEvent } from "react";

export const PasswordRecovery = () => {
    const [searchParams] = useSearchParams();
    const token: string | null = searchParams.get("token")

    const tokenParam: string = token ? `?token=${token}` : ""

    return <>
        <Header />
        <EmberView path={`password-recovery${tokenParam}`} />
    </>
}

export const PasswordRecovery2 = () => {
    const [searchParams] = useSearchParams();
    const token: string | null = searchParams.get("token")

    const tokenParam: string = token ? `?token=${token}` : ""
    const { theme } = useThemeContext()


    return <>
        <Header />
        <UserCard title="Recuperar contraseña" handleSubmit={() => { }}>
            <UserTextField label='Usuario o email' required />
            <Typography sx={{width: '70%'}}>"Escribí el usuario o el correo electrónico, y te enviaremos a tu casilla las instrucciones para reestablecer tu contraseña. Cualquier problema podés comunicarte a pilasbloques@program.ar"</Typography>
        </UserCard>
    </>
}

type UserCardProps = {
    title: string,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    children: React.ReactNode
}

export const UserCard = (props: UserCardProps) => {

    const { theme } = useThemeContext()

    return <>
        <Stack style={{ justifyContent: 'center', minHeight: '90vh', alignItems: "center", backgroundImage: "url(imagenes/book-background.svg)" }}>
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


