import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../../header/Header"
import { Button, CircularProgress, Link, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { DialogSnackbar } from "../../dialogSnackbar/DialogSnackbar";
import { PilasBloquesApi } from "../../../pbApi";
import { useTranslation } from "react-i18next";
import { PBMailLink, UserCard, UserTextField } from "../userForm";
import { PasswordInput } from "../register/Register";

export const PasswordRecovery = () => {
    const [searchParams] = useSearchParams();
    const token: string | null = searchParams.get("token")

    const { t } = useTranslation('passwordRecovery');

    const [serverError, setServerError] = useState<boolean>(false)

    return <>
        <Header />
        {!token ?
            <SendEmail setServerError={setServerError} />
            : <NewPassword setServerError={setServerError} token={token} />}
        <DialogSnackbar
            open={serverError}
            onClose={() => setServerError(false)}
            message={t('serverError')} />
    </>
}

type SendEmailProps = {
    setServerError: (serverError: boolean) => void,
}

const SendEmail = ({ setServerError }: SendEmailProps) => {

    const { t } = useTranslation('passwordRecovery');
    const [userIdentifier, setUserIdentifier] = useState<string>('')
    const [mailSent, setMailSent] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            setLoading(true)
            await PilasBloquesApi.passwordRecovery(userIdentifier)
            setLoading(false)
            setMailSent(true)
        } catch (error: any) {
            setServerError(true)
        }
    }

    return <UserCard title={t("passwordRecovery")} handleSubmit={handleSubmit}>
        {mailSent ? <>
            <Typography><b>{t('mailSent')} <PBMailLink /></b></Typography>
            <Button variant="contained" color="success" href="/#">{t("backToHome")}</Button>
        </>
            :
            <>
                <UserTextField
                    label={t("userIdentifier")}
                    onChange={props => setUserIdentifier(props.target.value)}
                    required
                />
                <Typography sx={{ width: '70%', textAlign: 'center' }}>{t("instructions")} <PBMailLink /></Typography>
                {loading ? <CircularProgress /> : <Button variant="contained" color="success" type='submit'>{t("passwordRecovery")}</Button>}
            </>
        }
    </UserCard>
}

type NewPasswordProps = {
    setServerError: (serverError: boolean) => void,
    token: string
}

const NewPassword = ({ setServerError, token }: NewPasswordProps) => {
    const { t } = useTranslation('passwordRecovery');
    const navigate = useNavigate()

    const [validPassword, setValidPassword] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPasswordOk, setConfirmPasswordOk] = useState<boolean>(false)


    const handlePassword = (password: string) => {
        setNewPassword(password)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            await PilasBloquesApi.changePassword(newPassword, token)
            navigate('/#')
        } catch (error: any) {
            setServerError(true)
        }
    }

    return <UserCard title={t("newPassword")} handleSubmit={handleSubmit}>
        <PasswordInput
            password={newPassword}
            handlePassword={handlePassword}
            setValidPassword={setValidPassword}
            confirmPasswordOk={confirmPasswordOk}
            setConfirmPasswordOk={setConfirmPasswordOk}
        />
        <Button disabled={!(validPassword && confirmPasswordOk)} variant="contained" color="success" type='submit'>{t("changePassword")}</Button>

    </UserCard>
}

export const ChangePassword = () => {

    const navigate = useNavigate()
    const { t } = useTranslation('passwordRecovery');
    const [searchParams] = useSearchParams();
    const token: string | null = searchParams.get("token")

    const isTokenValid = useLoaderData()

    const handleSubmit = () => {
        navigate(`/recuperar-contrasenia?token=${token}`)
    }

    return <>
        <Header />
        <UserCard title={isTokenValid ? t("stablishPassword") : t("expiredTokenTitle")} handleSubmit={handleSubmit}>
            {isTokenValid ? <></>
                : <Typography>{t("expiredTokenMessage")}<Link href='/#/recuperar-contrasenia'>{t("expiredTokenLink")}</Link></Typography>}
            <Button disabled={!isTokenValid} variant="contained" color="success" type='submit'>{t("passwordRecovery")}</Button>
        </UserCard>
    </>
}