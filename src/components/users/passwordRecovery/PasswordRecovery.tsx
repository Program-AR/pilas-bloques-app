import { useSearchParams } from "react-router-dom";
import { Header } from "../../header/Header"
import { Button, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { DialogSnackbar } from "../../dialogSnackbar/DialogSnackbar";
import { PilasBloquesApi } from "../../../pbApi";
import { useTranslation } from "react-i18next";
import { PBMailLink, UserCard, UserTextField } from "../userForm";
import { useThemeContext } from "../../../theme/ThemeContext";
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
            : <NewPassword setServerError={setServerError}/>}
        <DialogSnackbar
            open={serverError}
            onClose={() => setServerError(false)}
            message={t('serverError')} />
    </>
}

type PasswordRecoveryProps = {
    setServerError: (serverError: boolean) => void,
}

const SendEmail = ({ setServerError }: PasswordRecoveryProps) => {

    const { t } = useTranslation('passwordRecovery');
    const [userIdentifier, setUserIdentifier] = useState<string>('')
    const [mailSent, setMailSent] = useState<boolean>(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            await PilasBloquesApi.passwordRecovery(userIdentifier)
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
                <Button variant="contained" color="success" type='submit'>{t("passwordRecovery")}</Button>
            </>
        }
    </UserCard>
}

const NewPassword = ({ setServerError }: PasswordRecoveryProps) => {
    const { t } = useTranslation('passwordRecovery');
    const { theme } = useThemeContext()

    const [validPassword, setValidPassword] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPasswordOk, setConfirmPasswordOk] = useState<boolean>(false)


    const handlePassword = (password: string) => {
        setNewPassword(password)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            //await PilasBloquesApi.changePassword(userIdentifier)
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