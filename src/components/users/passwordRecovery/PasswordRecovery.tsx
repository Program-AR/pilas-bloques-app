import { useSearchParams } from "react-router-dom";
import { EmberView } from "../../emberView/EmberView"
import { Header } from "../../header/Header"
import { Button, Divider, Link, Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { PBCard } from "../../PBCard";
import { useThemeContext } from "../../../theme/ThemeContext";
import styles from './userForm.module.css';
import { FormEvent, useState } from "react";
import { DialogSnackbar } from "../../dialogSnackbar/DialogSnackbar";
import { PilasBloquesApi } from "../../../pbApi";
import { useTranslation } from "react-i18next";

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

    const { t } = useTranslation('passwordRecovery');


    const [serverError, setServerError] = useState<boolean>(false)
    const [mailSent, setMailSent] = useState<boolean>(false)
    const [userIdentifier, setUserIdentifier] = useState<string>('')




    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            console.log(token)
            await PilasBloquesApi.passwordRecovery(userIdentifier)
            setMailSent(true)
        } catch (error: any) {
            setServerError(true)
        }
    }

    return <>
        <Header />
        <UserCard title={t("passwordRecovery")} handleSubmit={handleSubmit}>
            {!mailSent ? <>
                <UserTextField 
                    label={t("userIdentifier")}
                    required
                    onChange={props => setUserIdentifier(props.target.value)}
                    />
                <Typography sx={{ width: '70%', textAlign: 'center' }}>{t("instructions")} <PBMailLink/></Typography>
                <Button variant="contained" color="success" type='submit'>{t("passwordRecovery")}</Button>
            </>
                : <>
                    <Typography><b>{t('mailSent')} <PBMailLink/></b></Typography>
                    <Button variant="contained" color="success" href="/#">Regresar al inicio</Button>
                </>}
        </UserCard>
        <DialogSnackbar
            open={serverError}
            onClose={() => setServerError(false)}
            message={t('serverError')} />
    </>
}

export const PBMailLink = () => <Link href="mailto:pilasbloques@program.ar">pilasbloques@program.ar</Link>

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


