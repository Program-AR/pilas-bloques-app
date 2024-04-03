import { useSearchParams } from "react-router-dom";
import { Header } from "../../header/Header"
import { Button, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { DialogSnackbar } from "../../dialogSnackbar/DialogSnackbar";
import { PilasBloquesApi } from "../../../pbApi";
import { useTranslation } from "react-i18next";
import { PBMailLink, UserCard, UserTextField } from "../userForm";

export const PasswordRecovery = () => {
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
                <Typography sx={{ width: '70%', textAlign: 'center' }}>{t("instructions")} <PBMailLink /></Typography>
                <Button variant="contained" color="success" type='submit'>{t("passwordRecovery")}</Button>
            </>
                : <>
                    <Typography><b>{t('mailSent')} <PBMailLink /></b></Typography>
                    <Button variant="contained" color="success" href="/#">{t("backToHome")}</Button>
                </>}
        </UserCard>
        <DialogSnackbar
            open={serverError}
            onClose={() => setServerError(false)}
            message={t('serverError')} />
    </>
}